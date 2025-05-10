import Container from "@/components/v2/Container";
import MediaGallery from "@/components/v2/MediaGallery";
import Separator from "@/components/v2/Separator";
import Text from "@/components/v2/Text";

const text = 
`Our previous components system, while functional, had limitations:
- Content, attachments, embeds, and components had to follow fixed positioning rules
- Visual styling options were limited

Our new component system addresses these challenges:
1. Fully composable components
2. Can be arranged in any order
3. More flexible design options`;

export default function Home() {
  return (
    <div className="w-full h-full min-h-screen p-2">
      <Container>
        <MediaGallery
          items={[
            {
              media: {
                url: "https://media.discordapp.net/attachments/697138785317814292/1364347504702914602/docs-header.png?ex=68211221&is=681fc0a1&hm=ee70d7400f2a97a833741294bcbed66ddffb6373a26e2c960a82aae9adab2c17&=&format=webp&quality=lossless"
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
    </div>
  );
}
