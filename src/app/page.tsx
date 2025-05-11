"use client"

import { useState } from "react";
import Container from "@/components/v2/Container";
import MediaGallery from "@/components/v2/MediaGallery";
import Separator from "@/components/v2/Separator";
import Text from "@/components/v2/Text";

type ComponentType = "text" | "media" | "separator";
type Component = {
  type: ComponentType;
  id: string;
  content?: string;
  mediaProps?: MediaGalleryProps;
};

const defaultPresets: Component[] = [
  {
    type: "text",
    id: "default-text-1",
    content: "Welcome to the builder!"
  },
  {
    type: "media",
    id: "default-media-1",
    mediaProps: {
      items: [{
        media: {
          url: "https://cdn.discordapp.com/attachments/697138785317814292/1364347504702914602/docs-header.png?ex=68211221&is=681fc0a1&hm=ee70d7400f2a97a833741294bcbed66ddffb6373a26e2c960a82aae9adab2c17&"
        },
        spoiler: false,
        description: "Default image"
      }]
    }
  }
];

export default function Home() {
  const [components, setComponents] = useState<Component[]>(defaultPresets);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const addComponent = (type: ComponentType) => {
    const newComponent: Component = {
      type,
      id: crypto.randomUUID(),
    };

    switch (type) {
      case "text":
        newComponent.content = "New text component";
        break;
      case "media":
        newComponent.mediaProps = {
          items: [{
            media: {
              url: "https://cdn.discordapp.com/attachments/697138785317814292/1364347504702914602/docs-header.png?ex=68211221&is=681fc0a1&hm=ee70d7400f2a97a833741294bcbed66ddffb6373a26e2c960a82aae9adab2c17&"
            },
            spoiler: false,
            description: "Spoiler image"
          }]
        };
        break;
    }

    setComponents([...components, newComponent]);
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
  };

  const renderEditor = (component: Component) => {
    switch (component.type) {
      case "text":
        return (
          <div className="space-y-2">
            <textarea
              value={component.content}
              onChange={(e) => updateComponent(component.id, { content: e.target.value })}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
        );
      case "media":
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={component.mediaProps?.items[0]?.media.url}
              onChange={(e) => updateComponent(component.id, {
                mediaProps: {
                  items: [{
                    ...component.mediaProps!.items[0],
                    media: { url: e.target.value }
                  }]
                }
              })}
              className="w-full p-2 border rounded"
              placeholder="Media URL"
            />
            <input
              type="text"
              value={component.mediaProps?.items[0]?.description}
              onChange={(e) => updateComponent(component.id, {
                mediaProps: {
                  items: [{
                    ...component.mediaProps!.items[0],
                    description: e.target.value
                  }]
                }
              })}
              className="w-full p-2 border rounded"
              placeholder="Description"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={component.mediaProps?.items[0]?.spoiler}
                onChange={(e) => updateComponent(component.id, {
                  mediaProps: {
                    items: [{
                      ...component.mediaProps!.items[0],
                      spoiler: e.target.checked
                    }]
                  }
                })}
              />
              <span className="ml-2">Spoiler</span>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full min-h-screen p-2 flex">
      <div className="w-1/3 p-4 border-r border-border">
        <h2 className="text-xl font-bold mb-4">Builder</h2>
        <div className="space-y-4">
          <button 
            onClick={() => addComponent("text")}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Add Text
          </button>
          <button
            onClick={() => addComponent("media")}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Add Media
          </button>
          <button 
            onClick={() => addComponent("separator")}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Add Separator
          </button>

          <div className="mt-8">
            <h3 className="font-bold mb-2">Edit Components</h3>
            {components.map((component) => (
              <div key={component.id} className="border p-2 mb-2 rounded">
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={() => setSelectedComponent(
                      selectedComponent === component.id ? null : component.id
                    )}
                    className="text-blue-500"
                  >
                    {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
                  </button>
                  <button
                    onClick={() => removeComponent(component.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                {selectedComponent === component.id && renderEditor(component)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-2/3 p-4">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <Container accentColor="016CC6">
          {components.map((component) => {
            switch (component.type) {
              case "text":
                return <Text key={component.id}>{component.content || ""}</Text>;
              case "media":
                return (
                  <MediaGallery
                    key={component.id}
                    items={component.mediaProps?.items ?? []}
                  />
                );
              case "separator":
                return <Separator key={component.id} />;
              default:
                return null;
            }
          })}
        </Container>
      </div>
    </div>
  );
}
