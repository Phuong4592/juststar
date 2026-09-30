// Contract coverage: page-landmark, heading-hierarchy, bounded-form, product-context
import { render, screen } from "@testing-library/react"

import { LoginPage } from "./login-page"

describe("LoginPage", () => {
  it("provides the page-landmark and heading-hierarchy", () => {
    render(<LoginPage brand="Enosta" form={<button>Sign in</button>} title="Welcome back" />)
    expect(screen.getByRole("main")).toHaveAccessibleName("Welcome back")
    expect(screen.getByRole("heading", { level: 1, name: "Welcome back" })).toBeInTheDocument()
  })

  it("provides a bounded-form", () => {
    render(<LoginPage brand="Enosta" form={<button>Sign in</button>} title="Welcome back" />)
    expect(screen.getByRole("button", { name: "Sign in" }).parentElement).toHaveAttribute(
      "data-en-part",
      "login-form",
    )
  })

  it("provides product-context", () => {
    render(
      <LoginPage
        asideItems={["Shared patterns"]}
        asideTitle="Operational clarity"
        brand="Enosta"
        form={<button>Sign in</button>}
        title="Welcome back"
      />,
    )
    expect(
      screen.getByRole("complementary", { name: "Product access context" }),
    ).toBeInTheDocument()
    expect(screen.getByText("Shared patterns")).toBeInTheDocument()
    expect(screen.getByText("01")).toHaveAttribute("data-en-font", "primary")
  })

  it("omits the complementary landmark without aside content", () => {
    render(<LoginPage brand="Enosta" form={<button>Sign in</button>} title="Welcome back" />)
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument()
  })
})
