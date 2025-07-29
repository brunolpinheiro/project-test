import {useEffect,useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';

import {usePrintersDiscovery,Printer } from 'react-native-esc-pos-printer';


// Componente de item para a lista de impressoras encontradas
const ItemImpressora = ({ nome }) => (
  <View style={styles.item}>
    <Text style={styles.nomeImpressora}>{nome}</Text>
  </View>
);

const TelaImpressora = () => {
  // Estado para controlar o carregamento (simulação)
  const [buscando, setBuscando] = useState(false);
  // Estado para armazenar as impressoras encontradas (simulação)
  const [impressoras, setImpressoras] = useState([]);

  const {printers,isDiscovering,start} = usePrintersDiscovery()

  
 useEffect(() => {
      start();
    }, []);

  // Função para simular a busca de impressoras
  const buscarImpressoras = async() => {
    setBuscando(isDiscovering);
    const showPrinters = await printers;
    if(showPrinters){
        console.log("impressoras disponiveis", showPrinters)
    }
    else{
        console.log("nenhuma ", showPrinters);
    }
    
   


    setTimeout(() => {
      // Dados de exemplo
      const impressorasEncontradas = [
        { id: '1', nome: 'HP LaserJet Pro M404dn' },
        { id: '2', nome: 'Epson EcoTank L3250' },
        { id: '3', nome: 'Brother HL-L2350DW' },
      ];
      setImpressoras(printers);
      setBuscando(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Encontrar Impressora</Text>
        <Text style={styles.subtitulo}>Toque no botão para buscar por impressoras na sua rede.</Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={buscarImpressoras} disabled={buscando}>
        <Text style={styles.textoBotao}>
          {buscando ? 'Buscando...' : 'Buscar Impressoras'}
        </Text>
      </TouchableOpacity>

      {buscando && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}

      <FlatList
        data={impressoras}
        renderItem={({ item }) => <ItemImpressora nome={item.nome} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          !buscando && impressoras.length === 0 && (
            <Text style={styles.textoVazio}>Nenhuma impressora encontrada.</Text>
          )
        )}
      />
    </SafeAreaView>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loader: {
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  nomeImpressora: {
    fontSize: 16,
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default TelaImpressora;