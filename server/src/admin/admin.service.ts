import {Injectable} from '@nestjs/common';
import {PrismaService} from '../core/prisma.service';
import {Company, User} from '@prisma/client';

@Injectable()
export class AdminService {
    constructor(private prismaService: PrismaService) {
    }

    async getAllUsers(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    async getAllCompanies(): Promise<Company[]> {
        return this.prismaService.company.findMany();
    }

    async addRole(userId: number): Promise<User> {
        return this.prismaService.user.update({
            where: {id: userId},
            data: {role: 'admin'},
        });
    }

    async deleteUser(userId: number) {
        return this.prismaService.user.delete({
            where: {id: userId}
        })
    }

    async deleteCompany(companyId: number) {
        return this.prismaService.company.delete({
            where: {id: companyId}
        })
    }
}
