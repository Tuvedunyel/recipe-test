import { withAppLayout } from '@/layouts/app-layout';
import type { BreadcrumbItem, Recipe } from '@/types';
import recipes from '@/routes/recipes';
import { Form, Head } from '@inertiajs/react';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import TopActions from '@/components/top-actions';
import { Button } from '@/components/ui/button';
import { SaveIcon } from 'lucide-react';
import {
    type SelectOption,
    SelectWithItems,
} from '@/components/ui/select-with-items';
import { ImageInput } from '@/components/ui/image-input';
import { Card, CardContent } from '@/components/ui/card';
import {Textarea} from "@headlessui/react";

type Props = {
    recipe: Recipe,
    levels: SelectOption[]
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Recettes',
        href: recipes.index().url,
    },
    {
        title: 'Editer',
        href: "#",
    },
];

export default withAppLayout<Props>(breadcrumbs, ({recipe, levels}) => {
    console.log(recipe)
    const action = recipe.id ? recipes.update.form({recipe: recipe.id}) : recipes.store.form();

    return <>
        <Head title="Editer une recette"/>
        <Form {...action} className="space-y-4">
            {({errors, processing, progress}) => (
                <div className="grid gap-8 md:grid-cols-[1fr_350px] items-start">
                    <main className="space-y-4">
                        <FormField label="Nom" htmlFor="name" error={errors['name']}>
                            <Input id="name" name="name" defaultValue={recipe.name} aria-invalid={!!errors['name']}/>
                        </FormField>
                        <FormField label="Description" htmlFor="description" error={errors['description']}>
                            <Textarea id="description" name="description" rows={4} defaultValue={recipe.description} aria-invalid={!!errors['description']}/>
                        </FormField>
                    </main>
                    <Card>
                        <ImageInput id="image" progress={progress?.progress} className="aspect-video" name="image" aria-invalid={!!errors['image']} defaultValue={recipe.image}/>
                        <CardContent className="px-4 pb-6 space-y-4">
                            <FormField label="Nombre de personnes" htmlFor="persons" error={errors['persons']}>
                                <Input id="persons" name="persons" type="number" min="1" defaultValue={recipe.persons} aria-invalid={!!errors['persons']}/>
                            </FormField>
                            <FormField label="Durée (en minutes)" htmlFor="duration" error={errors['duration']}>
                                <Input id="duration" name="duration" type="number" min="1" defaultValue={recipe.duration} aria-invalid={!!errors['duration']}/>
                            </FormField>
                            <FormField label="Niveau de difficulté" htmlFor="level" error={errors['level']}>
                                <SelectWithItems items={levels} id="level" name="level" defaultValue={recipe.level} aria-invalid={!!errors['level']}/>
                            </FormField>
                        </CardContent>
                    </Card>

                    <TopActions>
                        <Button disabled={processing}>
                            <SaveIcon /> Enregistrer
                        </Button>
                    </TopActions>
                </div>
            )}
        </Form></>
})
