import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService){}
    signup() {
        return { msg: "Welcome to project-rc's auth page {signup} !" }
    }

    signin() {
        return { msg: "Welcome to project-rc's auth page {signin} !" }
    }
}