import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { BaseQueryApi } from "@reduxjs/toolkit/query";


export type IRole = 'SUPER_ADMIN' | 'ADMIN'

interface INavItem {
    id: string;
    name: string;
    route?: string;
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    child?: ISideItem[];
}

interface IDividerItem {
    id: string;
    type: "DIVIDER";
}

export interface IMeta {
    total: number,
    limit: number,
    page: number,
    totalPages: number
}

export interface IResponse<T> {
    statusCode: number,
    success: boolean,
    message: string,
    data: T,
    meta?: IMeta
}

export type IResponseRedux<T> = IResponse<T> & BaseQueryApi;

export interface IItem {
    id: string,
    name: string
}

export type ISideItem = INavItem | IDividerItem;

export type JWTPayload = {
    userId: string;
    role: IRole;
}