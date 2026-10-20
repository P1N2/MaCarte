package expo.modules.macarteocr

import android.graphics.Rect
import android.net.Uri
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MacarteOcrModule : Module() {
  // Le reconnaisseur est créé une seule fois et réutilisé entre les scans.
  private val recognizer by lazy {
    TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
  }

  override fun definition() = ModuleDefinition {
    Name("MacarteOcr")

    Function("isAvailable") { true }

    AsyncFunction("recognizeText") { uri: String, promise: Promise ->
      val context = appContext.reactContext
        ?: return@AsyncFunction promise.reject("ERR_NO_CONTEXT", "Contexte React indisponible", null)

      val image = try {
        // fromFilePath applique la rotation EXIF : les coordonnées renvoyées
        // correspondent à l'image telle qu'elle est affichée.
        InputImage.fromFilePath(context, Uri.parse(uri))
      } catch (e: Exception) {
        return@AsyncFunction promise.reject("ERR_IMAGE_LOAD", e.localizedMessage ?: "Impossible de charger l'image", e)
      }

      recognizer.process(image)
        .addOnSuccessListener { result ->
          val lines = result.textBlocks.flatMap { block ->
            block.lines.map { line ->
              mapOf(
                "text" to line.text,
                "confidence" to line.confidence.toDouble(),
                "frame" to frameOf(line.boundingBox)
              )
            }
          }
          promise.resolve(
            mapOf(
              "text" to result.text,
              "width" to image.width,
              "height" to image.height,
              "lines" to lines
            )
          )
        }
        .addOnFailureListener { e ->
          promise.reject("ERR_RECOGNITION", e.localizedMessage ?: "La reconnaissance a échoué", e)
        }
    }

    OnDestroy {
      recognizer.close()
    }
  }

  private fun frameOf(rect: Rect?): Map<String, Int>? =
    rect?.let { mapOf("x" to it.left, "y" to it.top, "width" to it.width(), "height" to it.height()) }
}
