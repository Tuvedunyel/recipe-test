import type { PropsWithChildren } from 'react';

export default function TopActions(props: PropsWithChildren) {
    return (
        <div
            className="absolute top-3 right-4 flex items-center justify-end gap-2 lg:right-6"
            {...props}
        />
    );
}
