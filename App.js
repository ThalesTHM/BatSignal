import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput, ScrollView } from 'react-native';

const batSignal = require('./assets/bat-signal.jpg');
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [showSignal, setShowSignal] = useState(false);
  const toggleSignal = () => setShowSignal(prev => !prev);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleSignal}>
        <Text style={styles.buttonText}>
          {showSignal ? 'Esconder o Batsinal' : 'Mostrar o Batsinal'}
        </Text>
      </TouchableOpacity>

      {showSignal && (
        <Image
          style={styles.image}
          source={batSignal}
          resizeMode="contain"
        />
      )}

      <TouchableOpacity
        style={[styles.button, { marginTop: 30 }]}
        onPress={() => navigation.navigate('Form')}
      >
        <Text style={styles.buttonText}>Ir para Formulário</Text>
      </TouchableOpacity>
    </View>
  );
}

function FormScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    const formData = { name, email, phone, location };
    alert('Dados enviados com sucesso!');
    navigation.navigate('Result', { formData });
  };

  return (
    <ScrollView contentContainerStyle={styles.formContainer}>
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="email@exemplo.com"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Localização</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Cidade, Estado"
      />

      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ResultScreen({ route }) {
  const { formData } = route.params;
  return (
    <View style={stylesResult.container}>
      <Text style={stylesResult.title}>Dados Enviados</Text>
      <Text style={stylesResult.text}>Nome: {formData.name}</Text>
      <Text style={stylesResult.text}>Email: {formData.email}</Text>
      <Text style={stylesResult.text}>Telefone: {formData.phone}</Text>
      <Text style={stylesResult.text}>Localização: {formData.location}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'BatSinal' }} />
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Formulário' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Resultado' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const stylesResult = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#FFCB05',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFCB05',
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#000',
  },
  label: {
    color: '#FFF',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    marginBottom: 12,
  },
});
