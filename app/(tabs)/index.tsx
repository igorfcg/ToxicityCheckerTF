import { Image,TextInput,TouchableOpacity, Text,FlatList, Platform, View } from 'react-native';
import { useState } from "react";
import { styles } from "../../src/constants/styles.jsx";
import { toxicityClassifier, toxicityLabels } from '../../src/lib/tensorflow.js';

export default function HomeScreen() {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isInitialTextVisible, setIsInitialTextVisible] = useState(true);
  const [mensagemDeAviso, setMensagemDeAviso] = useState("Verifique a agressividade do seu texto")
  const [estaCarregando, setEstaCarregando] = useState(false)

  // Função para adicionar um novo item à lista
  const adicionarItem = async () => {
    const predictions = await toxicityClassifier(inputText)
    const labelMaisProvavel = {
      label: null,
      probabilidade: 0
    } 
    
    predictions.forEach(prediction => {
      if(prediction.label == "toxicity") {
        return
      }

      const probabilidadeDaPredictionSerVerdadeira = prediction.results[0].probabilities[1]

      if(probabilidadeDaPredictionSerVerdadeira > labelMaisProvavel.probabilidade) {
        labelMaisProvavel.label = prediction.label
        labelMaisProvavel.probabilidade = probabilidadeDaPredictionSerVerdadeira
      }

    })

    if(labelMaisProvavel.probabilidade > 0.01) {
      setMensagemDeAviso(labelMaisProvavel.label)
    } else {
      setMensagemDeAviso("Você não foi tóxico :)")
    }

    // Verifica se o valor do TextInput não está vazio ou só contém espaços em branco
    if (inputText.trim() !== '') {
      // Adiciona o valor do TextInput à lista de itens
      setItems([...items, inputText]);
      // Limpa o TextInput após adicionar o item
      setInputText(''); 
    }

    setEstaCarregando(false)
  };

  const ListItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textItem}>{item}</Text>
      </View>
    )
  }

  const handleInputChange = (text: true) => {
    if (text) {
      setIsInitialTextVisible(false); // Esconde o texto inicial
    } else {
      setIsInitialTextVisible(true); // Mostra o texto inicial se o input estiver vazio
    }
  };
  const vrau = () => {
    handleInputChange;
    adicionarItem();
  };

  return (
    <View style={styles.container}>
     {isInitialTextVisible ? (
          <Text style={styles.initialText}>Este é o texto inicial</Text>
        ) : (
          <Text style={styles.placeholderText}> </Text> // Espaço reservado
        )}
          {/* <FlatList
        data={items}
        renderItem={({ item }) => <View style={styles.itemContainer}>
      </View>}
        keyExtractor={(item) => item}
         // Mensagem para lista vazia
        ListHeaderComponent={
          <View style={styles.listaVazia}>
            <Text style={styles.textoListaVazia}>aaa</Text>
           </View> 
        }
      /> */}
        <View style={styles.content}>
        <FlatList
        // style={styles.fat}
        data={items}
        renderItem={({ item }) => (<View style={styles.item}>
          <Text>{item.value}</Text>
        </View>
        )}
        keyExtractor={(item) => item}
         // Mensagem para lista vazia
        ListHeaderComponent={
          <View style={styles.listaVazia}>
            <Text style={styles.textoListaVazia}> Your text was: {mensagemDeAviso}</Text>
           </View> 
        }
      />
        <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Text here..."
        />
      <TouchableOpacity style={styles.botao}
      onPress={vrau}
      >To check</TouchableOpacity>
    </View>
  </View>
  );
}