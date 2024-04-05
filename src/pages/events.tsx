import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import { Table } from "../components/table/table";
import { TableHeader } from "../components/table/table-header";
import { TableRow } from "../components/table/table-row";
import { TableCell } from "../components/table/table-cell";
import { IconButton } from "../components/icon-button";
import { useEffect, useState } from "react";

interface Events {
    id: string
    title: string
    details: string
    maximumAttendees: number
    attendeesAmount: number
}

export function Events() {

    const [events, setEvents] = useState<Events[]>([]) 
    const [search, setSearch] = useState('')
    const [total, setTotal] = useState(0)

    useEffect(() => {

        fetch('http://localhost:3333/events')
        .then(response => response.json())
        .then(data => {
            setEvents(data)
            setTotal(data.length)
        })
    }, [])

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value)
    }

    const filtered = search != '' 
                    ? events.filter(event => event.title.toLowerCase().includes(search.toLowerCase()))
                    : events
    
    return (
        <div className="flex flex-col gap-4">   
            <div className="flex gap-4 items-center">
                <h1 className="text-2xl font-bold">Eventos</h1>
                <div className="flex gap-3 items-center">
                    <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg text-sm flex items-center gap-3">
                        <Search className="size-4 text-emerald-300"/>
                        <input type="text" 
                        onChange={onSearchInputChanged}
                        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm focus:ring-0" placeholder="Pesquise por títulos de eventos"/>
                    </div>
                </div>
            </div>


            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{ width: 48 }}>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Título</TableHeader>
                        <TableHeader>Participantes</TableHeader>
                        <TableHeader style={{ width: 64}}></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((event) => {
                        return (
                            <TableRow key={event.id}>
                                <TableCell>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                </TableCell>
                                <TableCell>{event.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{event.title}</span>
                                        <span className="text-gray-400">{event.details}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span>{event.attendeesAmount + `/` + event.maximumAttendees}</span>
                                </TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr className="border-b border-white/10">
                        <TableCell colSpan={3}>
                            Mostrando {filtered.length} de {total}
                        </TableCell>
                        <TableCell colSpan={3} className="text-right">
                        <div className="inline-flex items-center gap-8">
                                <span>Página 1 de 10</span>
                                <div className="flex gap-1.5">
                                    <IconButton>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}