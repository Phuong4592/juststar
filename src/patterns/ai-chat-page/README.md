# AI Chat Page

Contract ID: `component.ai-chat-page`

Use `AIChatPage` for a full-page conversation inside `ApplicationShell`. It owns the h1, scrollable conversation region, concise generation announcements, empty state, prompt suggestions, and sticky composer geometry. Consumers own message models, providers, transport, persistence, citations, tools, and composer behavior.

```tsx
<AIChatPage
  title="Delivery assistant"
  messages={<Messages />}
  status="Drafting response"
  composer={<Composer />}
/>
```

The pattern renders a labelled `section`, not another `main`; `ApplicationShell` owns the page main landmark. Its height is bounded to the available chat-panel area, the message region owns normal vertical scrolling, and the composer remains visible as a bottom sibling rather than being fixed to the global viewport. The default height uses the dynamic viewport so mobile browser and keyboard changes do not strand the composer, and its bottom inset respects the device safe area.

The conversation history is a named, focusable scroll region so keyboard users can reach and scroll long threads; customize its accessible name with `messagesLabel`. The nested message sequence uses `role="log"` with live announcements disabled. Pass a short `status` string or node for polite announcements instead of exposing every streamed token to assistive technology. Consumers may customize `--ai-chat-page-height` when the surrounding shell has a different header or panel geometry, but the value must remain bounded so the document does not become the conversation scroll owner.

| Prop            | Type        | Default                | Description                                       |
| --------------- | ----------- | ---------------------- | ------------------------------------------------- |
| `title`         | `ReactNode` | required               | Single conversation `h1`.                         |
| `messages`      | `ReactNode` | -                      | Consumer-rendered message sequence.               |
| `messagesLabel` | `string`    | `Conversation history` | Name of the focusable conversation scroll region. |
| `composer`      | `ReactNode` | required               | Consumer-owned prompt composer.                   |
| `busy`          | `boolean`   | `false`                | Marks the conversation log as generating.         |
| `status`        | `ReactNode` | -                      | Concise polite generation announcement.           |
| `suggestions`   | `ReactNode` | -                      | Prompt starter controls near the composer.        |

Customizable variables: `--ai-chat-page-height`, `--ai-chat-page-measure`.

Classification: `compatible`. New in `0.4.0`.
