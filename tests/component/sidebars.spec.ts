import { test, expect } from '@playwright/experimental-ct-vue';
import '../../src/style.css';
import LeftSidebarWrapper from './wrappers/LeftSidebarWrapper.vue';

test.describe('AppSidebar', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 });
    });

    test('renders and is visible', async ({ mount }) => {
        const component = await mount(LeftSidebarWrapper);
        await expect(component).toBeVisible();
    });

    test('renders key UI elements', async ({ mount }) => {
        const component = await mount(LeftSidebarWrapper);

        await expect(component.getByText('Single line text field')).toBeVisible();
        await expect(component.getByText('Multi-line text field')).toBeVisible();
        await expect(component.getByText('Email field input')).toBeVisible();
        await expect(component.getByText('Single number input')).toBeVisible();
        await expect(component.getByText('Telephone input field')).toBeVisible();
    });

    test('searches', async ({ mount }) => {
        const component = await mount(LeftSidebarWrapper);

        const input = component.getByPlaceholder('Search...');
        await expect(input).toBeVisible();
        await input.fill('text');

        await expect(component.getByText('Single line text field')).toBeVisible();
        await expect(component.getByText('Multi-line text field')).toBeVisible();
        await expect(component.getByText('Email field input')).not.toBeVisible();
    });
});
