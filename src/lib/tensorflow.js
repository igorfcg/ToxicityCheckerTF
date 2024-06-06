import * as toxicity from '../../node_modules/@tensorflow-models/toxicity';
import '@tensorflow/tfjs'


export const toxicityLabels = [
  "identity_attack",
  "insult",
  "obscene",
  "severe_toxicity",
  "sexual_explicit",
  "threat",
  "toxicity",
];

export async function toxicityClassifier(sentence) {

  console.log("> Chegou aqui", sentence);

  // The minimum prediction confidence.
  const threshold = 0.9;

  // Load the model. Users optionally pass in a threshold and an array of
  // labels to include.
  const model = await toxicity.load(threshold, toxicityLabels)

  console.log("> model", model);

  const sentences = [sentence];

  const predictions = await model.classify(sentences)

  console.log("> predictions", predictions);

  return predictions

    /*
    prints:
    {
      "label": "identity_attack",
      "results": [{
        "probabilities": [0.9659664034843445, 0.03403361141681671],
        "match": false
      }]
    },
    {
      "label": "insult",
      "results": [{
        "probabilities": [0.08124706149101257, 0.9187529683113098],
        "match": true
      }]
    },
    ...
     */
  
}