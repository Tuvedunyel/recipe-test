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
import type { BreadcrumItem, Recipe, PaginatedCollection } from '@/types'
import { Form, Link } from '@inertiajs/react'
import { Edit, Plus, Trash } from 'lucie-react'

const breadcrumbs: BreadcrumItem[] = [
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
            </Table>
        </div>
    )
})
