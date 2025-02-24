# React Storybook

## What is React Storybook?

React Storybook (or simply Storybook) is an open-source tool for building, documenting, and testing UI components in isolation. It allows developers to create, showcase, and interact with individual components without running the entire application.

## Why Use Storybook?

- Component Isolation 🏗️
  You can develop and test UI components independently without worrying about backend logic or application state.
- Improved UI Development 🚀
  Faster feedback loop by visualizing how components behave with different props, states, and interactions.
- Interactive Documentation 📖
  Storybook serves as a living documentation for your components, making it easier for teams to reuse and maintain UI elements.
- Testing UI States Easily ✅
  Helps test different states (loading, error, success) by passing different props, without navigating through the app.
- Supports Multiple Frameworks 🔥
  Although commonly used with React, Storybook also supports Vue, Angular, Svelte, and more.
- Addon Ecosystem 🛠️
  Tons of plugins for accessibility testing, responsiveness, controls, and design systems (like Figma integration).

## Who Uses Storybook?

Big companies like Airbnb, Shopify, and GitHub use Storybook to manage their UI components efficiently. It’s especially useful for design systems, component libraries, and frontend-heavy applications.

## Installation

- Step 1: Navigate to Your Project make sure you're inside your React or Next.js project folder:
  `cd your-project`
- Step 2: Install Storybook run the following command to install Storybook automatically:
  `npx storybook@latest init`<br/>
  This will: - Detect your framework (React, Next.js, etc.). - Install all required Storybook dependencies. - Generate the .storybook configuration folder. - Add example stories in the src/stories directory.
- Step 3: Start Storybook after installation, start Storybook with:
  `npm run storybook`
  This will launch Storybook at http://localhost:6006 🎉

## Bonus: Next.js Setup (If Needed)

If you're using Next.js, install the required dependencies:
`npm install --save-dev @storybook/nextjs`
Then update .storybook/main.ts to use the Next.js builder.

## Understanding the .storybook Directory in Storybook

The .storybook directory is the core configuration folder for Storybook. It contains all the files needed to customize how Storybook behaves, loads stories, and integrates with your project. Let’s break down its main files and their roles.

## 📁 .storybook Folder Structure

After running `npx storybook@latest init`, Storybook generates the `.storybook` directory in your project root. It typically contains:

```txt
.storybook/
│── main.ts # Core configuration (stories, addons, framework settings)
│── preview.ts # Global decorators, parameters, and styling
│── manager.ts # Customizes the Storybook UI (optional)
│── preview-head.html (optional) # Modifies Storybook's head tag (e.g., adding meta tags)
│── preview-body.html (optional) # Modifies Storybook's body tag (e.g., adding scripts)
```

### 🔹main.ts – Core Storybook Configuration

The main.ts file is the most important configuration file. It defines how Storybook discovers stories, what addons to use, and which framework is being used.
Example main.ts File (for React/Next.js)

```ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"], // Where Storybook looks for stories
  addons: [
    "@storybook/addon-links", // Adds navigation between stories
    "@storybook/addon-essentials", // Provides common features like docs, controls, actions, etc.
    "@storybook/addon-interactions", // Helps with component interaction testing
  ],
  framework: {
    name: "@storybook/react-vite", // Specifies the framework
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
```

#### Key Configurations in main.ts

- stories: Defines where Storybook should look for component stories.
- addons: Lists Storybook addons that enhance functionality.
- framework: Specifies the framework (React, Vue, Next.js, etc.).
- docs.autodocs: Controls how documentation is generated.

### 🔹 preview.ts – Global Storybook Configuration

The preview.ts file is where you set global decorators, parameters, and styles for all stories.
Example preview.ts File

```ts
import type { Preview } from "@storybook/react";
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" }, // Auto-detects event handlers (e.g., onClick)
    controls: {
      matchers: {
        color: /(background|color)$/i, // Detects color props
        date: /Date$/, // Detects date props
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#333333" },
      ],
    },
  },
};

export default preview;
```

#### Key Configurations in preview.ts

- parameters: Controls default Storybook behavior (actions, controls, backgrounds, etc.).
- decorators: Adds global wrappers (e.g., themes, contexts).

### 🔹manager.ts – Storybook UI Customization (Optional)

If you want to customize the Storybook UI, you can create a manager.ts file.
Example manager.ts File

```ts
import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";

addons.setConfig({
  theme: themes.dark, // Changes Storybook to dark mode
});
```

#### What Can You Do with manager.ts?

Customize Storybook’s theme (dark/light mode).
Change the sidebar layout and UI styles.

## 🔹preview-head.html & preview-body.html (Optional)

These files allow you to modify the HTML structure of Storybook.
Example preview-head.html

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto" />
```

This loads Google Fonts for all stories.

Example preview-body.html

```html
<script>
  console.log("Storybook is running!");
</script>
```

This runs JavaScript when Storybook loads.

### Conclusion 🚀

The `.storybook` directory is the heart of your Storybook setup.
`main.ts` configures the framework, stories, and addons.
`preview.ts` defines global settings and decorators.
`manager.ts` customizes the Storybook UI.
`preview-head.html` and `preview-body.html` modify Storybook's structure.

**Now lets know what is story and how to create it**

## What's a story?

A story captures the rendered state of a UI component. Developers write multiple stories per component that describe all the “interesting” states a component can support.

When you installed Storybook, the CLI created example components that demonstrate the types of components you can build with Storybook: Button, Header, and Page.

Each example component has a set of stories that show the states it supports. You can browse the stories in the UI and see the code behind them in files that end with .stories.js|ts. The stories are written in Component Story Format (CSF), an ES6 modules-based standard for writing component examples.

Let's start with the Button component. A story is an object that describes how to render the component in question. Here’s how to render Button in the “primary” state and export a story called Primary.
`Button.stories.tsx`

```ts
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};
```

## How to create Story ?

- file name `[component name].stories.ts|js`
- story file contains 2 main parts

  - Meta Data very very important section contains meta data of Story this meta data contains

    - title : title of story on sidebar for example `title: "Atoms/AvatarAtom"` this mean this story name in sidebar AvatarAtom and will be under Atoms Accordion in sidebar
    - component: our component we want to visualize and create story for it
    - parameters : responsible for control layout of component in story convas example

    ```ts
    parameters: {
    layout: "centered",
    },
    ```

    - `tags: ["autodocs"],` mean make storybook package create docs for component automatically.
    - `args : {}` in args object we could send any parameters from parameters which component accept example

    ```ts
    args: {
      onClick: fn();
    }
    ```

    - Now we could create meta of Story and then export this meta as default see example
      `example 1`

    ```ts
    const meta = {
      title: "Example/Button",
      component: Button,
      parameters: {
        layout: "centered",
      },
      tags: ["autodocs"],
      argTypes: {
        backgroundColor: { control: "color" },
      },
      args: { onClick: fn() },
    } satisfies Meta<typeof Button>;

    export default meta;
    ```

    - Example 2

    ```ts
    const meta: Meta<typeof AvatarAtom> = {
      title: "Atoms/AvatarAtom",
      component: AvatarAtom,
      parameters: {
        layout: "centered",
      },
      tags: ["autodocs"],
      argTypes: {},
      args: {},
    };

    export default meta;
    ```

- Component Stories to create Component Stories

  - Create Story type from our component like this
    `type Story = StoryObj<typeof [ComponentName]|[meta we create]>;`
    Example 1 use component name :
    `type Story = StoryObj<typeof Button>;`
    Example 2 use meta variable :
    `type Story = StoryObj<typeof meta>;`
  - now start to create stories like that

    ```ts
    export const StoryName: Story = {
      argTypes: {},
      args: {
        // Component Props
      },
    };
    ```

    Examples

    ```ts
    export const Primary: Story = {
      argTypes: {},
      args: {
        primary: true,
        label: "Button",
      },
    };

    export const Secondary: Story = {
      args: {
        label: "Button",
      },
    };

    export const Large: Story = {
      args: {
        size: "large",
        label: "Button",
      },
    };

    export const Small: Story = {
      args: {
        size: "small",
        label: "Button",
      },
    };
    ```

Now We could create our component Story See Example

```ts
import type { Meta, StoryObj } from "@storybook/react";
import AvatarAtom from "./Avatar";

const meta: Meta<typeof AvatarAtom> = {
  title: "Atoms/AvatarAtom",
  component: AvatarAtom,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta; // Default export for the metadata

type Story = StoryObj<typeof meta>;

// Define the stories for AvatarAtom
export const Bordered: Story = {
  args: {
    // Define arguments or props if needed
  },
};

export const WithoutBorder: Story = {
  args: {
    // Define arguments or props if needed
    border: false,
  },
};
```

Example 2

```ts
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  argTypes: {},
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
```

