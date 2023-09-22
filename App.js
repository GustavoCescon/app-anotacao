import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Constants from "expo-constants";

import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function App() {
  const [estado, setEstado] = useState("leitura");
  const [anotacao, setAnotacao] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const anotacaoLeitura = await AsyncStorage.getItem("anotacao");
        setAnotacao(anotacaoLeitura);
      } catch (error) {}
    })();
  }, []);
  setData = async () => {
    try {
      await AsyncStorage.setItem("anotacao", anotacao);
    } catch (error) {}
    alert("Sua anotação foi salva");
  };

  function atualizarTexto() {
    setEstado("leitura");
    setData();
  }

  if (estado === "leitura") {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <View style={styles.header}>
          <Text style={styles.nomeAplicao}>Aplicativo Anotação</Text>
        </View>
        {anotacao != "" ? (
          <View>
            <Text style={styles.textoAnotacao}>{anotacao}</Text>
          </View>
        ) : (
          <View style={{ padding: 20 }}>
            <Text style={{ opacity: 0.3 }}>Nenhuma anotação encontrada</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.botaoAnotacao}
          onPress={() => setEstado("atualizando")}
        >
          {anotacao == "" ? (
            <Text style={styles.textoBotaoAnotacao}>+</Text>
          ) : (
            <Text
              style={{
                fontSize: 12,
                color: "#fff",
                textAlign: "center",
                marginTop: 16,
              }}
            >
              Editar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  } else if (estado === "atualizando") {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <View style={styles.header}>
          <Text style={styles.nomeAplicao}>Aplicativo Anotação</Text>
        </View>
        <TextInput
          style={{ height: 300, textAlignVertical: "top", padding: 20 }}
          multiline={true}
          numberOfLines={5}
          value={anotacao}
          onChangeText={(text) => setAnotacao(text)}
        ></TextInput>
        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={() => atualizarTexto()}
        >
          <Text style={styles.textoBotaoSalvar}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 10,
    backgroundColor: "#069",
  },
  nomeAplicao: {
    textAlign: "center",
    color: "white",
    fontSize: 22,
    marginTop: Constants.statusBarHeight,
  },
  textoAnotacao: {
    padding: 20,
    fontSize: 16,
  },
  botaoAnotacao: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: "#069",
    borderRadius: 25,
  },
  botaoSalvar: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#069",
  },
  textoBotaoAnotacao: {
    color: "#fff",
    position: "relative",
    textAlign: "center",
    top: 3,
    fontSize: 30,
  },
  textoBotaoSalvar: {
    textAlign: "center",
    color: "#fff",
  },
});
