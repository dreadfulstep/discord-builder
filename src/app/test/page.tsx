import Message from "@/components/Message";
import Container from "@/components/v2/Container";
import MediaGallery from "@/components/v2/MediaGallery";
import Separator from "@/components/v2/Separator";
import Text from "@/components/v2/Text";

const text = `> Hey\n## Introducing New Components for Messages!\nWe're bringing new components to messages that you can use in your apps. They allow you to have full control over the layout of your messages.\n\nOur previous components system, while functional, had limitations:\n- Content, attachments, embeds, and components had to follow fixed positioning rules\n- Visual styling options were limited\n\nOur new component system addresses these challenges with fully composable components that can be arranged and laid out in any order, allowing for a more flexible and visually appealing design. Check out the [changelog](https://discord.com/developers/docs/change-log) for more details.`;

export default function Test() {
  return (
    <div className="w-full h-full min-h-screen p-2">
      <Message
        avatar="https://cdn.discordapp.com/avatars/1364335922652512307/856e08e2ad4ec8c77ff331acdb182fc3.webp?size=100"
        bot
        username="Bot"
      >
        <Container accentColor="016CC6">
          <MediaGallery
            items={[
              {
                media: {
                  url: "https://media.discordapp.net/attachments/697138785317814292/1364347504702914602/docs-header.png?ex=68211221&is=681fc0a1&hm=ee70d7400f2a97a833741294bcbed66ddffb6373a26e2c960a82aae9adab2c17&=&format=webp&quality=lossless",
                },
                spoiler: false,
                description: "Spoiler image",
              },
            ]}
          />
          <Text>{text}</Text>
          <Separator />
          <Text>Hey!</Text>
        </Container>
      </Message>
    </div>
  );
}
