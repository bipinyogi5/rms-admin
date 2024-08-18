export interface TableDataResponse<TData = unknown> {
    data: TData | null;
    draw
    :
    number
    recordsFiltered
    :
    number
    recordsTotal
    :
    number
}