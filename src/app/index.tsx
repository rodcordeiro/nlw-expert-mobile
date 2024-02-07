import React from 'react';
import { View, FlatList, SectionList, Text } from 'react-native';
import { Link } from 'expo-router';

import { Header } from '@/components/header';
import { CategoryButton } from '@/components/category-button';
import { CATEGORIES, MENU } from '@/utils/data/products';
import { Product } from '@/components/product';
import { useCartStore } from '@/stores/cart-store';

export default function Home() {
  const cartStore = useCartStore();
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    CATEGORIES[0],
  );
  const sectionListRef = React.useRef<SectionList>(null);
  const cartQuantityItems = cartStore.products.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  function handleCategorySelect(category: string) {
    setSelectedCategory(category);
    if (sectionListRef.current) {
      const sectionIndex = CATEGORIES.findIndex((item) => item === category);
      console.log({ sectionIndex });
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View className="flex-1 pt-10">
      <Header
        title="Faça seu pedido"
        cartQuantityItems={cartQuantityItems || 0}
      />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={selectedCategory === item}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      />
    </View>
  );
}
