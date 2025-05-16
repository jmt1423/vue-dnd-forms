import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

const dragElement = async (page: Page, originElement: Locator, destinationElement: Locator) => {
  await originElement.hover();
  await page.mouse.down();
  const box = (await destinationElement.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await destinationElement.hover();
  await page.mouse.up();
}

test.describe("Test drag and drop functions", () => {
  test("Text input should be visible", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const originElement = page.getByRole("button", { name: "Text Single line text field" })
    const destinationElement = page.getByTestId("drop-area")

    await dragElement(page, originElement, destinationElement)

    await expect(page.getByText("Client Name")).toBeVisible();
  });

  test("Text and number should be visible", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const o1 = page.getByRole('button', { name: 'Number Single number input' })
    const d1 = page.getByTestId("drop-area")
    await dragElement(page, o1, d1)

    await expect(page.getByText("Client Age")).toBeVisible();



    const o2 = page.getByRole("button", { name: "Text Single line text field" })
    const d2 = page.getByText("Client Age")

    await dragElement(page, o2, d2)

    await expect(page.getByText("Client Name")).toBeVisible();
  })
})
