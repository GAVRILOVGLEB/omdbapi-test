import React, { useState, useMemo } from "react";
import {
    useArrowNavigationGroup,
    Link,
    makeStyles,
    Spinner,
    Subtitle2,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    useTableFeatures,
    TableColumnDefinition,
    TableColumnId,
    useTableSort,
    createTableColumn,
    SortDirection,
    TableSelectionCell,
    useTableSelection,
} from "@fluentui/react-components";
import { Pagination } from "@fluentui/react-experiments/lib/Pagination";
import { useStatemanjs } from "@persevie/statemanjs-react";
import {
    moviesState,
    isRefreshingState,
} from "../../../infrastructure/storage/storageService";
import { movieSelectionState, showMovieDetailsPanel } from "../../state";
import { Movie } from "../../../domain/movie";
import { PagePanelKind } from "../../entities";

type HeaderSortProps = {
    onClick: (e: React.MouseEvent) => void;
    sortDirection: SortDirection | undefined;
};

const useStyles = makeStyles({
    table: {
        minWidth: "600px",
    },
    spinner: {
        position: "absolute",
        top: "-30px",
        width: "100%",
    },
    wrapper: {
        position: "relative",
    },
});

function Movies(): JSX.Element {
    const classes = useStyles();
    const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });

    const movies = useStatemanjs(moviesState);
    const movieSelection = useStatemanjs(movieSelectionState);
    const isRefreshing = useStatemanjs(isRefreshingState);

    const [sortState, setSortState] = useState<{
        sortDirection: "ascending" | "descending";
        sortColumn: TableColumnId | undefined;
    }>({
        sortDirection: "ascending" as const,
        sortColumn: "title",
    });
    const [selectedPageIndex, setSelectedPageIndex] = useState(0);

    const columns: TableColumnDefinition<Movie>[] = useMemo(
        () => [
            createTableColumn<Movie>({
                columnId: "title",
                compare: (a, b) => {
                    const first = a.Title ?? "N/A";
                    const second = b.Title ?? "N/A";
                    return first.localeCompare(second);
                },
            }),
            createTableColumn<Movie>({
                columnId: "director",
                compare: (a, b) => {
                    const first = a.Director ?? "N/A";
                    const second = b.Director ?? "N/A";
                    return first.localeCompare(second);
                },
            }),
            createTableColumn<Movie>({
                columnId: "genre",
                compare: (a, b) => {
                    const first = a.Genre ?? "N/A";
                    const second = b.Genre ?? "N/A";
                    return first.localeCompare(second);
                },
            }),
            createTableColumn<Movie>({
                columnId: "website",
                compare: (a, b) => {
                    const first = a.Website ?? "N/A";
                    const second = b.Website ?? "N/A";
                    return first.localeCompare(second);
                },
            }),
            createTableColumn<Movie>({
                columnId: "year",
                compare: (a, b) => {
                    const first = a.Year ?? "N/A";
                    const second = b.Year ?? "N/A";
                    return first.localeCompare(second);
                },
            }),
            createTableColumn<Movie>({
                columnId: "imdbRating",
                compare: (a, b) => {
                    const first = a.imdbRating ?? "N/A";
                    const second = b.imdbRating ?? "N/A";
                    return first.localeCompare(second);
                },
            }),
        ],
        [],
    );

    const {
        getRows,
        sort: { getSortDirection, toggleColumnSort, sort },
        selection: { toggleRow, isRowSelected },
    } = useTableFeatures<Movie>(
        {
            columns,
            items: movies,
        },
        [
            useTableSort({
                sortState,
                onSortChange: (e, nextSortState) => setSortState(nextSortState),
            }),
            useTableSelection({
                selectionMode: "single",
                selectedItems: new Set([...movieSelection]),
                onSelectionChange: (_e, nextSelelectedRows) => {
                    movieSelectionState.set(nextSelelectedRows.selectedItems);
                    showMovieDetailsPanel(PagePanelKind.MoreAboutMovie);
                },
            }),
        ],
    );

    const headerSortProps = (columnId: TableColumnId): HeaderSortProps => {
        return {
            onClick: (e: React.MouseEvent) => toggleColumnSort(e, columnId),
            sortDirection: getSortDirection(columnId),
        };
    };

    const rows = sort(
        getRows(row => {
            const selected = isRowSelected(row.rowId);
            return {
                ...row,
                onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
                onKeyDown: (e: React.KeyboardEvent): void => {
                    if (e.key === " " || e.key === "Enter") {
                        toggleRow(e, row.rowId);
                    }
                },
                selected,
                appearance: selected ? ("brand" as const) : ("none" as const),
            };
        }),
    );

    const pageCount =
        rows.length % 20 > 0 ? rows.length / 20 : rows.length / 20 + 1;

    return (
        <div className={classes.wrapper}>
            {isRefreshing ? (
                <Spinner size="extra-small" className={classes.spinner} />
            ) : null}
            <Table className={classes.table} sortable {...keyboardNavAttr}>
                <TableHeader>
                    <TableRow>
                        <TableSelectionCell type="radio" invisible />
                        <TableHeaderCell {...headerSortProps("title")}>
                            Title
                        </TableHeaderCell>
                        <TableHeaderCell {...headerSortProps("director")}>
                            Director
                        </TableHeaderCell>
                        <TableHeaderCell {...headerSortProps("genre")}>
                            Genre
                        </TableHeaderCell>
                        <TableHeaderCell {...headerSortProps("website")}>
                            Website
                        </TableHeaderCell>
                        <TableHeaderCell {...headerSortProps("year")}>
                            Year
                        </TableHeaderCell>
                        <TableHeaderCell {...headerSortProps("imdbRating")}>
                            IMDB Rating
                        </TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody {...keyboardNavAttr}>
                    {rows.map(
                        (
                            { item, selected, onClick, onKeyDown, appearance },
                            index,
                        ) => {
                            return (
                                <TableRow
                                    key={item.Title + index}
                                    onClick={onClick}
                                    onKeyDown={onKeyDown}
                                    aria-selected={selected}
                                    appearance={appearance}
                                >
                                    <TableSelectionCell
                                        tabIndex={0}
                                        checkboxIndicator={{
                                            tabIndex: -1,
                                        }}
                                        checked={selected}
                                        type="radio"
                                        radioIndicator={{
                                            "aria-label": "Select row",
                                        }}
                                    />
                                    <TableCell>
                                        <Link as="a" appearance="subtle">
                                            {item.Title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{item.Director}</TableCell>
                                    <TableCell>{item.Genre}</TableCell>
                                    <TableCell>{item.Website}</TableCell>
                                    <TableCell>{item.Year}</TableCell>
                                    <TableCell>{item.imdbRating}</TableCell>
                                </TableRow>
                            );
                        },
                    )}
                </TableBody>
            </Table>
            {!rows.length ? (
                <div style={{ width: "max-content", padding: "2rem" }}>
                    <Subtitle2>No entries for search results...</Subtitle2>
                </div>
            ) : null}
            {pageCount > 1 ? (
                <Pagination
                    selectedPageIndex={selectedPageIndex}
                    pageCount={pageCount}
                    itemsPerPage={20}
                    totalItemCount={rows.length}
                    format={"buttons"}
                    pageAriaLabel={"page"}
                    selectedAriaLabel={"selected"}
                    onPageChange={setSelectedPageIndex}
                />
            ) : null}
        </div>
    );
}

export default Movies;
