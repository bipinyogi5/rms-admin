export interface ColumnModel{
    keyName:string
    keyValue:string
    buttons?:Array<String>
    renderer?:any
    customRender?: any
    width?:string
    hasHtml?:boolean
    extraColumnVal?: Array<String>
}