import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';

import { CameraView, useCameraPermissions } from 'expo-camera';
const operateurs = [
  {
    id: 'moov',
    nom: 'Moov Africa',
    logo: require('./assets/image.png'),
    couleur: '#0774db',
  },
  {
    id: 'airtel',
    nom: 'Airtel Niger',
    logo: require('./assets/image3.png'),
    couleur: '#E30613',
  },
  {
    id: 'niger-telecoms',
    nom: 'Niger Telecoms',
    logo: require('./assets/image1.png'),
    couleur: '#FF8C00',
  },
  {
    id: 'zamani',
    nom: 'Zamani Telecom',
    logo: require('./assets/image2.png'),
    couleur: '#ffd000',
  },
];

export default function App() {
  const [operateurChoisi, setOperateurChoisi] = useState(null);
  const [ouvrirCamera, setOuvrirCamera] = useState(false);
  const [permission, demanderPermission] = useCameraPermissions();
  const choisirOperateur = (operateur) => {
    setOperateurChoisi(operateur);
  };

  const commencerScan = async () => {
    if (!operateurChoisi) {
      alert('Choisissez d’abord votre réseau téléphonique.');
      return;
    }

    const permissionCamera = await demanderPermission();

    if (!permissionCamera.granted) {
      alert('Autorisation caméra nécessaire.');
      return;
    }

    setOuvrirCamera(true);
  };

 if (ouvrirCamera) {
  return (
    <View style={styles.ecranScan}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <View style={styles.enteteScan}>
        <TouchableOpacity
          onPress={() => setOuvrirCamera(false)}
          style={styles.boutonRetour}
        >
          <Text style={styles.texteRetour}>‹</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.titreScan}>Scanner ma carte</Text>
          <Text style={styles.sousTitreScan}>
            {operateurChoisi?.nom}
          </Text>
        </View>
      </View>

      <Text style={styles.instructionScan}>
        Placez les chiffres dans le cadre
      </Text>

      <Text style={styles.aideScan}>
        Maintenez votre téléphone stable et assurez-vous
        que les chiffres sont bien visibles.
      </Text>

      <View style={styles.zoneCamera}>
        <CameraView
          style={styles.camera}
          facing="back"
        >
          <View
            style={[
              styles.zoneScan,
              {
                borderColor:
                  operateurChoisi?.couleur ?? '#176B55',
              },
            ]}
          />
        </CameraView>
      </View>

      <Text style={styles.conseilScan}>
        Seuls les chiffres placés dans le rectangle
        seront ciblés pour la lecture.
      </Text>

      <View style={styles.basScan}>
        <Text style={styles.texteHorsLigne}>
          ● Lecture prévue hors ligne
        </Text>
      </View>
    </View>
  );
}

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F4F7F5"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contenu}
      >
        {/* En-tête */}
        <View style={styles.header}>
          <View style={styles.logoApplication}>
            <Text style={styles.iconeLogo}>M</Text>
          </View>

          <View style={styles.headerTexte}>
            <Text style={styles.nomApplication}>Macarte</Text>
            <Text style={styles.sousTitre}>
              LE RECHARGEMENT SIMPLIFIÉ
            </Text>
          </View>

          <View style={styles.badgeHorsLigne}>
            <Text style={styles.pointVert}>●</Text>
            <Text style={styles.texteHorsLigne}>Hors ligne</Text>
          </View>
        </View>

        {/* Présentation */}
        <View style={styles.presentation}>
          <Text style={styles.titrePrincipal}>
            Rechargez.
          </Text>

          <Text style={styles.titreVert}>
            Sans saisir.
          </Text>

          <Text style={styles.description}>
            Scannez votre carte de recharge, vérifiez le code
            et préparez votre recharge en quelques secondes.
          </Text>
        </View>

        {/* Choix du réseau */}
        <View style={styles.sectionOperateurs}>
          <Text style={styles.titreSection}>
            Choisissez votre réseau
          </Text>

          <Text style={styles.aideSection}>
            Sélectionnez l’opérateur de votre carte.
          </Text>

          <View style={styles.grille}>
            {operateurs.map((operateur) => {
              const selectionne =
                operateurChoisi?.id === operateur.id;

              return (
                <TouchableOpacity
                  key={operateur.id}
                  activeOpacity={0.8}
                  onPress={() => choisirOperateur(operateur)}
                  style={[
                    styles.carteOperateur,
                    selectionne && {
                      borderColor: operateur.couleur,
                      backgroundColor: '#F0F7F2',
                    },
                  ]}
                >
                  <View style={styles.logoConteneur}>
                    <Image
                      source={operateur.logo}
                      style={styles.logoOperateur}
                      resizeMode="contain"
                    />
                  </View>

                  <Text style={styles.nomOperateur}>
                    {operateur.nom}
                  </Text>

                  <Text style={styles.typeCarte}>
                    Carte de recharge
                  </Text>

                  {selectionne && (
                    <View
                      style={[
                        styles.indicateurSelection,
                        { backgroundColor: operateur.couleur },
                      ]}
                    >
                      <Text style={styles.coche}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Bouton de scan */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={commencerScan}
          style={[
            styles.boutonScan,
            !operateurChoisi && styles.boutonInactif,
          ]}
        >
          <Text style={styles.iconeScan}>▣</Text>
          <Text style={styles.texteBouton}>
            Scanner ma carte
          </Text>
        </TouchableOpacity>

        <Text style={styles.noteScan}>
          Le code sera vérifié avant toute tentative de recharge.
        </Text>

        {/* Pied de page */}
        <View style={styles.footer}>
          <Text style={styles.footerTexte}>
            Simple  •  Rapide  •  Hors ligne
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },

  contenu: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 35,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 38,
  },

  logoApplication: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#176B55',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconeLogo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },

  headerTexte: {
    flex: 1,
    marginLeft: 11,
  },

  nomApplication: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#182A22',
  },

  sousTitre: {
    fontSize: 9,
    letterSpacing: 1,
    color: '#64736C',
    marginTop: 3,
  },

  badgeHorsLigne: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3ECE6',
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 20,
  },

  pointVert: {
    color: '#176B55',
    fontSize: 9,
    marginRight: 4,
  },

  texteHorsLigne: {
    fontSize: 10,
    color: '#176B55',
    fontWeight: '600',
  },

  presentation: {
    marginBottom: 32,
  },

  titrePrincipal: {
    fontSize: 37,
    fontWeight: '800',
    color: '#182A22',
    letterSpacing: -1,
  },

  titreVert: {
    fontSize: 37,
    fontWeight: '800',
    color: '#176B55',
    letterSpacing: -1,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#64736C',
    marginTop: 12,
  },

  sectionOperateurs: {
    marginBottom: 22,
  },

  titreSection: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#182A22',
  },

  aideSection: {
    fontSize: 12,
    color: '#77827C',
    marginTop: 6,
    marginBottom: 17,
  },

  grille: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  carteOperateur: {
    width: '48%',
    minHeight: 160,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E3E9E5',
    borderRadius: 17,
    padding: 13,
    marginBottom: 13,
    alignItems: 'flex-start',
    position: 'relative',
  },

  logoConteneur: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 11,
  },

  logoOperateur: {
    width: 51,
    height: 51,
  },

  nomOperateur: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#182A22',
  },

  typeCarte: {
    fontSize: 10,
    color: '#77827C',
    marginTop: 5,
  },

  indicateurSelection: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },

  coche: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  boutonScan: {
    minHeight: 56,
    backgroundColor: '#176B55',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },

  boutonInactif: {
    backgroundColor: '#176B55',
  },

  iconeScan: {
    fontSize: 20,
    color: '#FFFFFF',
    marginRight: 10,
  },

  texteBouton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  noteScan: {
    textAlign: 'center',
    color: '#77827C',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 12,
    paddingHorizontal: 5,
  },

  footer: {
    alignItems: 'center',
    marginTop: 28,
  },

  footerTexte: {
    fontSize: 12,
    color: '#77827C',
  },
  cameraContainer:{
  flex:1,
},


camera:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
},


zoneScan:{
  width:"80%",
  height:120,
  borderWidth:3,
  borderRadius:15,
  justifyContent:"center",
  alignItems:"center",
},


messageScan:{
  backgroundColor:"rgba(0,0,0,0.5)",
  color:"#fff",
  padding:10,
  borderRadius:8,
  fontSize:14,
},
ecranScan: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 22,
  paddingTop: 25,
  paddingBottom: 20,
},

enteteScan: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 28,
},

boutonRetour: {
  width: 42,
  height: 42,
  borderRadius: 12,
  backgroundColor: '#F0F4F1',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},

texteRetour: {
  fontSize: 32,
  color: '#182A22',
  lineHeight: 36,
},

titreScan: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#182A22',
},

sousTitreScan: {
  fontSize: 12,
  color: '#64736C',
  marginTop: 3,
},

instructionScan: {
  fontSize: 23,
  fontWeight: 'bold',
  color: '#182A22',
  marginBottom: 8,
},

aideScan: {
  fontSize: 13,
  lineHeight: 20,
  color: '#64736C',
  marginBottom: 22,
},

zoneCamera: {
  width: '100%',
  height: 190,
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: '#202820',
  alignSelf: 'center',
},

camera: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

zoneScan: {
  width: '80%',
  height: 120,
  borderWidth: 3,
  borderRadius: 15,
},

conseilScan: {
  fontSize: 12,
  lineHeight: 18,
  color: '#64736C',
  textAlign: 'center',
  marginTop: 16,
},

basScan: {
  marginTop: 'auto',
  alignItems: 'center',
  paddingVertical: 12,
},
});