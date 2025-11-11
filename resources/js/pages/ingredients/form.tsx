import TopActions from '@/components/top-actions';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { ImageInput } from '@/components/ui/image-input';
import { Input } from '@/components/ui/input';
import {
    SelectOption,
    SelectWithItems,
} from '@/components/ui/select-with-items';
import { withAppLayout } from '@/layouts/app-layout';
import ingredients from '@/routes/ingredients';
import type { BreadcrumbItem, Ingredient } from '@/types';
import { Form } from '@inertiajs/react';
import { Save } from 'lucide-react';

type Props = {
    ingredient: Ingredient;
    units: SelectOption[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ingrédients',
        href: ingredients.index().url,
    },
    {
        title: 'Éditer',
        href: '',
    },
];
export default withAppLayout<Props>(breadcrumbs, ({ ingredient, units }) => {
    const action = ingredient.id
        ? ingredients.update.form({ ingredient: ingredient.id })
        : ingredients.store.form();
    return (
        <Form {...action} className="space-y-4">
            {({ errors, processing, progress }) => (
                <>
                    <FormField label="Image" error={errors['image']}>
                        <ImageInput
                            id="image"
                            className="aspect-square w-40"
                            name="image"
                            aria-invalid={!!errors['image']}
                            defaultValue={ingredient.image}
                            progress={progress?.progress}
                        />
                    </FormField>
                    <FormField
                        label="Nom"
                        htmlFor="name"
                        error={errors['name']}
                    >
                        <Input
                            id="name"
                            name="name"
                            defaultValue={ingredient.name}
                            aria-invalid={!!errors['name']}
                        />
                    </FormField>
                    <FormField
                        label="Unité"
                        htmlFor="unit"
                        error={errors['unit']}
                    >
                        <SelectWithItems
                            items={units}
                            id="unit"
                            name="unit"
                            defaultValue={ingredient.unit}
                            aria-invalid={!!errors['unit']}
                        />
                    </FormField>
                    <TopActions>
                        <Button disabled={processing}>
                            <Save /> Enregistrer
                        </Button>
                    </TopActions>
                </>
            )}
        </Form>
    );
});
