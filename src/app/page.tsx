import { Button, Flex } from "antd";

export default function Home() {
  return (
    <div>
      <div>
        <h1>Test</h1>
      </div>
      <div>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </div>
    </div>
  );
}
