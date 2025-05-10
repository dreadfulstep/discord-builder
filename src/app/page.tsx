import Container from "@/components/v2/Container";
import Text from "@/components/v2/Text";

const text = `
# Heading 1
## Heading 2\nThis is **bold**, *italic*, __bold__, _italic_, and --strikethrough--.
This is a new line.
`;

export default function Home() {
  return (
    <div className="w-full h-full min-h-screen p-2">
      <Container>
        <Text>
          {text}
        </Text>
      </Container>
    </div>
  );
}
