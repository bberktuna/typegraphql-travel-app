import React from 'react';
import { SafeAreaView, FlatList, Button } from 'react-native';
import {
  usePlacesQuery,
  useCreatePlaceMutation
} from '../../graphql';
import { CardView } from '../components';

interface Props {}

const Places: React.FC<Props> = () => {
  
  const { data, refetch } = usePlacesQuery();
  const [createPlace] = useCreatePlaceMutation();

  return (
    <SafeAreaView>
      <FlatList
        ListFooterComponent={() => (
          <Button
            title="Add New Place"
            onPress={() => {
              createPlace({
                variables: {
                  title: `Place #${data.places.length + 1}`,
                  description: '',
                  imageUrl: ''
                }
              })
                .then(() => refetch())
                .catch(err => console.log(err));
            }}
          />
        )}
        data={data && data.places ? data.places : []}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <CardView {...(item as any)} />}
      />
    </SafeAreaView>
  );
};
export default Places;