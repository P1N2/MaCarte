import { requireOptionalNativeModule } from 'expo';

// null quand le module natif n'est pas compilé (Expo Go, web) :
// l'application affiche alors un message au lieu de planter.
export default requireOptionalNativeModule('MacarteOcr');
