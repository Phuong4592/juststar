import type { Meta, StoryObj } from "@storybook/react-vite"

import { Avatar, Typography } from "@enosta/en-ui"

const AVATARS = [
  {
    alt: "Alice Johnson",
    fallback: "AJ",
    src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80",
  },
  {
    alt: "Bob Smith",
    fallback: "BS",
    src: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80",
  },
  {
    alt: "Carol Williams",
    fallback: "CW",
    src: "https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=96&h=96&dpr=2&q=80",
  },
] as const

const meta = {
  title: "Data Display/Avatar",
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas">
      <div className="space-y-6xl">
        <section>
          <Typography.H5 as="h2" className="mb-xl text-neutral-900">
            Images
          </Typography.H5>
          <div className="flex flex-wrap gap-xl">
            {AVATARS.map((avatar) => (
              <Avatar
                key={avatar.alt}
                image={{ alt: avatar.alt, src: avatar.src }}
                fallback={{ children: avatar.fallback }}
              />
            ))}
          </div>
        </section>

        <section>
          <Typography.H5 as="h2" className="mb-xl text-neutral-900">
            Sizes
          </Typography.H5>
          <div className="flex flex-wrap items-center gap-xl">
            <Avatar size="xs" fallback={{ children: "XS" }} />
            <Avatar size="sm" fallback={{ children: "SM" }} />
            <Avatar size="md" fallback={{ children: "MD" }} />
            <Avatar size="lg" fallback={{ children: "LG" }} />
          </div>
        </section>

        <section>
          <Typography.H5 as="h2" className="mb-xl text-neutral-900">
            Fallbacks
          </Typography.H5>
          <div className="flex flex-wrap gap-xl">
            <Avatar fallback={{ children: "JD" }} />
            <Avatar fallback={{ children: "AB" }} />
            <Avatar fallback={{ children: "+3", className: "bg-neutral-200" }} />
          </div>
        </section>

        <section>
          <Typography.H5 as="h2" className="mb-xl text-neutral-900">
            Group
          </Typography.H5>
          <div className="flex gap-xs -space-x-lg" aria-label="Project members">
            {AVATARS.map((avatar) => (
              <Avatar
                className="ring-2 ring-white"
                key={avatar.alt}
                image={{ alt: avatar.alt, src: avatar.src }}
                fallback={{ children: avatar.fallback }}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  ),
}

export const Basic: Story = {
  args: { fallback: { children: "AL" } },
  parameters: {
    docs: { source: { code: `<Avatar fallback={{ children: "AL" }} />`, language: "tsx" } },
  },
}

export const WithImage: Story = {
  render: () => (
    <Avatar
      image={{ alt: AVATARS[0].alt, src: AVATARS[0].src }}
      fallback={{ children: AVATARS[0].fallback }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Avatar
  image={{ alt: "Alice Johnson", src: avatarUrl }}
  fallback={{ children: "AJ" }}
/>`,
        language: "tsx",
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-xl">
      <Avatar size="xs" fallback={{ children: "XS" }} />
      <Avatar size="sm" fallback={{ children: "SM" }} />
      <Avatar size="md" fallback={{ children: "MD" }} />
      <Avatar size="lg" fallback={{ children: "LG" }} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="flex items-center gap-xl">
  <Avatar size="xs" fallback={{ children: "XS" }} />
  <Avatar size="sm" fallback={{ children: "SM" }} />
  <Avatar size="md" fallback={{ children: "MD" }} />
  <Avatar size="lg" fallback={{ children: "LG" }} />
</div>`,
        language: "tsx",
      },
    },
  },
}

export const Fallback: Story = {
  render: () => (
    <Avatar
      image={{ alt: "Missing profile", src: "/missing-avatar.png" }}
      fallback={{ children: "MP" }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Avatar
  image={{ alt: "Missing profile", src: "/missing-avatar.png" }}
  fallback={{ children: "MP" }}
/>`,
        language: "tsx",
      },
    },
  },
}

export const Groups: Story = {
  render: () => (
    <div className="flex gap-xs -space-x-lg" aria-label="Project members">
      {AVATARS.map((avatar) => (
        <Avatar
          className="ring-2 ring-white"
          key={avatar.alt}
          image={{ alt: avatar.alt, src: avatar.src }}
          fallback={{ children: avatar.fallback }}
        />
      ))}
      <Avatar
        className="ring-2 ring-white"
        fallback={{ children: "+3", className: "bg-neutral-200" }}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="flex gap-xs" aria-label="Project members">
  {members.map((member) => (
    <Avatar
      className="ring-2 ring-white"
      key={member.id}
      image={{ alt: member.name, src: member.avatarUrl }}
      fallback={{ children: member.initials }}
    />
  ))}
  <Avatar
    className="ring-2 ring-white"
    fallback={{ children: "+3", className: "bg-neutral-200" }}
  />
</div>`,
        language: "tsx",
      },
    },
  },
}
