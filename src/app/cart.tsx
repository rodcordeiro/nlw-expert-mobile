import { View, Text, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather } from '@expo/vector-icons';

import { ProductCartProps, useCartStore } from '@/stores/cart-store';

import { Header } from '@/components/header';
import { Product } from '@/components/product';
import { formatCurrency } from '@/utils/functions/format-currency';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { LinkButton } from '@/components/link-button';

export default function Cart() {
  const cartStore = useCartStore();

  const total = formatCurrency(
    cartStore.products.reduce((total, product) => total + product.price, 0),
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert('Remover', `Deseja remover ${product.title}?`, [
      { text: 'Cancelar' },
      { text: 'Remover', onPress: () => cartStore.remove(product.id) },
    ]);
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio!
              </Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>
            <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento" />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  );
}
