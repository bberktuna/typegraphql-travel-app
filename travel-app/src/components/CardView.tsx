import React from "react"
import { Avatar, Button, Card, Title, Paragraph} from "react-native-paper"

const CardView = ({ title, description, imageUrl, onPress, user }) => {
    return(
<Card onPress={() => onPress && onPress()}>
        {!!user && (
            <Card.Title
                title={user.username}
                subtitle={user.email}
                left={props => (
                    <Avatar.Icon
                        {...props}
                        style={{ backgroundColor: "lightblue" }}
                        color="#fff"
                        size={42}
                        icon="image"
                    />
                )}
            />
        )}
    <Card.Cover source={{uri: imageUrl || "https://picsum.photos/700"}} />

    <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{description} </Paragraph>
    </Card.Content>

</Card>
)
}

export default CardView