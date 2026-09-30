import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Button,
  Checkbox,
  Field,
  FieldError,
  FieldLabel,
  Input,
  LoginPage,
  Separator,
  Typography,
} from "@enosta/en-ui"

function SignInForm({ error = false }: { error?: boolean }) {
  return (
    <form className="grid gap-3xl" noValidate>
      {error ? (
        <div
          aria-labelledby="sign-in-error"
          className="rounded-control border border-error-500 bg-error-50 p-xl"
          role="alert"
        >
          <Typography.Label as="p" className="text-error-700" id="sign-in-error">
            We could not sign you in
          </Typography.Label>
          <Typography.Small className="text-neutral-600">
            Check your email and password, then try again.
          </Typography.Small>
        </div>
      ) : null}
      <Field>
        <FieldLabel htmlFor="sign-in-email">Work email</FieldLabel>
        <Input
          aria-invalid={error || undefined}
          autoComplete="email"
          defaultValue={error ? "an@enosta.dev" : undefined}
          id="sign-in-email"
          placeholder="you@enosta.dev"
          required
          type="email"
        />
        {error ? <FieldError>Enter a valid work email address.</FieldError> : null}
      </Field>
      <Field>
        <FieldLabel htmlFor="sign-in-password">Password</FieldLabel>
        <Input
          aria-invalid={error || undefined}
          autoComplete="current-password"
          id="sign-in-password"
          placeholder="Enter your password"
          required
          type="password"
        />
        {error ? <FieldError>Password is incorrect.</FieldError> : null}
      </Field>
      <div className="flex flex-wrap items-center justify-between gap-md">
        <Typography.Label
          as="label"
          className="flex items-center gap-md text-neutral-700"
          htmlFor="sign-in-persist"
        >
          <Checkbox id="sign-in-persist" />
          Keep me signed in
        </Typography.Label>
        <Typography.Small as="a" className="text-brand-600 hover:underline" href="#recover">
          Forgot password?
        </Typography.Small>
      </div>
      <Button size="lg" type="submit">
        Sign in to workspace
      </Button>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-xl">
        <Separator className="col-start-1 col-end-2" />
        <Typography.Caption as="span" className="text-neutral-500">
          or
        </Typography.Caption>
        <Separator className="col-start-3 col-end-4" />
      </div>
      <Button size="lg" type="button" variant="secondary">
        Continue with Microsoft
      </Button>
    </form>
  )
}

function LoginSpecimen({ error = false }: { error?: boolean }) {
  return (
    <LoginPage
      asideDescription="One secure entry point for staffing, delivery, finance, and customer operations."
      asideItems={[
        "Dense operational interfaces built from shared En UI patterns.",
        "Accessible controls and responsive behavior protected by contracts.",
        "Semantic tokens keep every Enosta product visually aligned.",
      ]}
      asideTitle="Move from intent to operational clarity."
      brand="Enosta workspace"
      description="Use your Enosta account to continue to the operations workspace."
      footer={
        <>
          Need access?{" "}
          <a className="text-brand-600 hover:underline" href="#support">
            Contact workspace support
          </a>
          .
        </>
      }
      form={<SignInForm error={error} />}
      title="Welcome back."
    />
  )
}

const meta = {
  title: "Patterns/Login page",
  component: LoginPage,
  args: { brand: "Enosta", form: null, title: "Welcome back" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LoginPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <LoginSpecimen /> }
export const ValidationError: Story = { render: () => <LoginSpecimen error /> }
