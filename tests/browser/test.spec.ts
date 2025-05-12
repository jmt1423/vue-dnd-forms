import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-vue';
import '../../src/style.css';
import {h} from 'vue';
import SidebarProvider from '../../lib/ui/sidebar/SidebarProvider.vue';
import AppSidebar from '../../lib/form-builder/sidebar-component/left-sidebar/AppSidebar.vue';

const renderWithProvider = () => {
    return render({
        render() {
            return h(SidebarProvider, {}, {
                default: () => h(AppSidebar)
            });
        }
    });
};

describe('Left Sidebar tests', () => {
    test('renders and is visible', () => {
        const component = renderWithProvider();
        expect(component.container).toBeVisible();
      });

    test('renders key UI elements', () => {
        const component = renderWithProvider();
        expect(component.getByText('Single line text field')).toBeVisible();
        expect(component.getByText('Multi-line text field')).toBeVisible();
        expect(component.getByText('Email field input')).toBeVisible();
        expect(component.getByText('Single number input')).toBeVisible();
        expect(component.getByText('Telephone input field')).toBeVisible();
      });

    test('searches', async () => {
        const component = renderWithProvider();

        const input = component.getByPlaceholder('Search...');
        expect(input).toBeVisible();
        await input.fill('text');

        expect(component.getByText('Single line text field')).toBeVisible();
        expect(component.getByText('Multi-line text field')).toBeVisible();
        await expect.poll(() => component.getByText('Email field input').query()).not.toBeInTheDocument()
      });
});