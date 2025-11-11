import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { FC, type ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const AppLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const page = usePage<SharedData>();

    useEffect(() => {
        if (page.props.flash.success) {
            toast.success(page.props.flash.success);
        }
        if (page.props.flash.error) {
            toast.error(page.props.flash.error);
        }
    }, [page.props.flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster richColors position="top-center" closeButton />
        </AppLayoutTemplate>
    );
};

export function withAppLayout<T>(
    breadcrumbs: BreadcrumbItem[],
    component: FC<T>,
) {
    // @ts-expect-error layout exists for inertia
    component.layout = (page: ReactNode) => (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4 lg:p-6">{page}</div>
        </AppLayout>
    );
    return component;
}

export default AppLayout;
