import { CollectionPagination } from '@/components/collection-pagination'
import { SortableTableHead } from '@/components/sortable-table-head'
import TopActions from '@/components/top-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { withAppLayout } from '@/layouts/app-layout'
import recipes from '@/routes/recipes'
import type { BreadcrumbItem, Recipe, PaginatedCollection } from '@/types'
import {Form, Link} from '@inertiajs/react'
import {Edit, Plus, Trash} from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Recettes',
        href: recipes.index().url,
    },
]

type Props = {
    collection: PaginatedCollection<Recipe>;
    q: string | null
}

export default withAppLayout(breadcrumbs, ({ collection, q }: Props) => {
    return (
        <div className="space-y-4">
            <TopActions>
                <Form
                    {...recipes.index.form()}
                    className="flex items-center gap-1"
                >
                    <Input
                        defaultValue={q ?? ''}
                        autoFocus
                        placeholder="Rechercher une recette"
                        name="q"
                    />
                    <Button>Rechercher</Button>
                </Form>
            </TopActions>
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableTableHead className="w-5" field="id">
                            ID
                        </SortableTableHead>
                        <TableHead className="w-20" />
                        <SortableTableHead field="name">Nom</SortableTableHead>
                        <SortableTableHead field="persons">Personnes</SortableTableHead>
                        <SortableTableHead field="duration">Durée (min)</SortableTableHead>
                        <SortableTableHead field="level">Niveau</SortableTableHead>
                        <TableHead className="text-end w-20">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableCell colSpan={7}>
                        <Button asChild variant="outline" className="w-full">
                            <Link href={recipes.create()}>
                                <Plus />
                                Ajouter un ingrédient
                            </Link>
                        </Button>
                    </TableCell>
                    {collection.data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="aspect-square size-20 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="aspect-square size-20 rounded-lg bg-background"></div>
                                )}
                            </TableCell>
                            <TableCell>
                                <Link
                                    className="hover:underline"
                                    href={recipes.edit({
                                        recipe: item.id,
                                    })}
                                >
                                    {item.name}
                                </Link>
                            </TableCell>
                            <TableCell>{item.persons}</TableCell>
                            <TableCell>{item.duration} min</TableCell>
                            <TableCell>{item.level_label}</TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        asChild
                                        size="icon"
                                        variant="outline"
                                    >
                                        <Link
                                            href={recipes.edit({
                                                recipe: item.id,
                                            })}
                                        >
                                            <Edit size={16} />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="icon"
                                        variant="destructive-outline"
                                    >
                                        <Link
                                            href={recipes.destroy({
                                                recipe: item.id,
                                            })}
                                            onBefore={() =>
                                                confirm(
                                                    'Voulez-vous vraiment supprimer cet ingrédient ?',
                                                )
                                            }
                                        >
                                            <Trash size={16} />
                                        </Link>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
})
