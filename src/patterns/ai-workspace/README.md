# AI Workspace

Contract ID: `component.ai-workspace`

Use `AIWorkspace` for parallel AI conversation and artifact preview workflows. It owns the page `h1`; the conversation slot must not contain `AIChatPage` or another `h1`. Desktop users can resize the conversation panel with pointer dragging or Arrow/Home/End keys. Narrow screens show one panel at a time through an explicit Chat/Preview switcher.

```tsx
<AIWorkspace
  title="Page generator"
  conversation={<Chat />}
  preview={<Preview />}
  previewState="ready"
/>
```

The layout owns geometry, panel labels, resize semantics, mobile switching, and preview state attributes. Consumers own AI providers, message state, artifact rendering, persistence, versioning, and approvals. Do not duplicate the conversation or preview to create mobile layouts.

| Prop                      | Type                                         | Default        | Description                                    |
| ------------------------- | -------------------------------------------- | -------------- | ---------------------------------------------- |
| `title`                   | `ReactNode`                                  | required       | Single workspace `h1`.                         |
| `conversation`            | `ReactNode`                                  | required       | Consumer-owned conversation workflow.          |
| `preview`                 | `ReactNode`                                  | required       | Consumer-owned artifact preview.               |
| `conversationLabel`       | `string`                                     | `Chat`         | Conversation panel and mobile-tab label.       |
| `previewLabel`            | `string`                                     | `Preview`      | Preview panel and mobile-tab label.            |
| `defaultConversationSize` | `number`                                     | `38`           | Initial desktop conversation width percentage. |
| `minConversationSize`     | `number`                                     | `25`           | Minimum desktop conversation width percentage. |
| `maxConversationSize`     | `number`                                     | `60`           | Maximum desktop conversation width percentage. |
| `defaultMobileView`       | `"conversation" \| "preview"`                | `conversation` | Initially visible narrow-screen panel.         |
| `previewState`            | `"ready" \| "loading" \| "empty" \| "error"` | `ready`        | Current artifact preview state.                |

Treat each desktop panel as its own responsive container. Content inside the conversation and preview slots must reflow against the actual panel width at the configured minimum, default, and maximum split sizes rather than relying only on browser viewport breakpoints.

Customizable variables: `--ai-workspace-conversation-size`, `--ai-workspace-height`.

Classification: `compatible`. New in `0.4.0`.
