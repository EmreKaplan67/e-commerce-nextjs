import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";

import { db } from "@/app/db/db";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductActions";

export default function AdminProductsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-8">
        <div>
          <PageHeader>Products</PageHeader>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and organize your product catalog
          </p>
        </div>
        <Button variant="outline" size="lg" asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  })

  if (products.length === 0)
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">No products found</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Get started by adding your first product
        </p>
      </div>
    )

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900/50">
            <TableHead className="w-0 px-6 py-4">
              <span className="sr-only">Availability Status</span>
                Available
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Product Name
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Price
            </TableHead>
            <TableHead className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Orders
            </TableHead>
            <TableHead className="w-0 px-6 py-4 text-right">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
            >
              <TableCell className="w-0 px-6 py-4">
                {product.isAvailableForPurchase ? (
                  <>
                    <span className="sr-only">Available for purchase</span>
                    <div className="flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  </>
                ) : (
                  <>
                    <span className="sr-only">Not available for purchase</span>
                    <div className="flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                  </>
                )}
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {product.name}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                  {formatCurrency(product.priceInCents / 100)}
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30">
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    {formatNumber(product._count.orders)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="w-0 px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="sr-only">Open actions menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <a
                        download
                        href={`/admin/products/${product.id}/download`}
                        className="cursor-pointer"
                      >
                        Download
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <ActiveToggleDropdownItem
                      id={product.id}
                      isAvailableForPurchase={product.isAvailableForPurchase}
                    />
                    <DropdownMenuSeparator />
                    <DeleteDropdownItem
                      id={product.id}
                      disabled={product._count.orders > 0}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
