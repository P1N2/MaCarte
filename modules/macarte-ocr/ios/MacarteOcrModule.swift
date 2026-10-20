import ExpoModulesCore
import ImageIO
import UIKit
import Vision

public class MacarteOcrModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MacarteOcr")

    Function("isAvailable") { true }

    AsyncFunction("recognizeText") { (uri: String, promise: Promise) in
      guard let url = URL(string: uri), url.isFileURL,
            let image = UIImage(contentsOfFile: url.path),
            let cgImage = image.cgImage else {
        promise.reject("ERR_IMAGE_LOAD", "Impossible de charger l'image : \(uri)")
        return
      }

      // Taille de l'image une fois l'orientation EXIF appliquée.
      let size = image.size
      let request = VNRecognizeTextRequest { request, error in
        if let error = error {
          promise.reject("ERR_RECOGNITION", error.localizedDescription)
          return
        }
        let observations = request.results as? [VNRecognizedTextObservation] ?? []
        var lines: [[String: Any]] = []
        for observation in observations {
          guard let candidate = observation.topCandidates(1).first else { continue }
          // Vision renvoie des coordonnées normalisées avec l'origine en bas à gauche.
          let box = observation.boundingBox
          lines.append([
            "text": candidate.string,
            "confidence": Double(candidate.confidence),
            "frame": [
              "x": box.origin.x * size.width,
              "y": (1 - box.origin.y - box.size.height) * size.height,
              "width": box.size.width * size.width,
              "height": box.size.height * size.height
            ]
          ])
        }
        promise.resolve([
          "text": lines.compactMap { $0["text"] as? String }.joined(separator: "\n"),
          "width": size.width,
          "height": size.height,
          "lines": lines
        ])
      }
      request.recognitionLevel = .accurate
      // La correction linguistique abîme les suites de chiffres : on la désactive.
      request.usesLanguageCorrection = false
      if #available(iOS 16.0, *) {
        request.automaticallyDetectsLanguage = false
      }

      let handler = VNImageRequestHandler(
        cgImage: cgImage,
        orientation: CGImagePropertyOrientation(image.imageOrientation),
        options: [:]
      )
      DispatchQueue.global(qos: .userInitiated).async {
        do {
          try handler.perform([request])
        } catch {
          promise.reject("ERR_RECOGNITION", error.localizedDescription)
        }
      }
    }
  }
}

private extension CGImagePropertyOrientation {
  init(_ orientation: UIImage.Orientation) {
    switch orientation {
    case .up: self = .up
    case .down: self = .down
    case .left: self = .left
    case .right: self = .right
    case .upMirrored: self = .upMirrored
    case .downMirrored: self = .downMirrored
    case .leftMirrored: self = .leftMirrored
    case .rightMirrored: self = .rightMirrored
    @unknown default: self = .up
    }
  }
}
