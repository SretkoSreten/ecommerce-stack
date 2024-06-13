import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { StatusService } from '../services/order_status.service';


@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) { }

    @Get('/')
    getAllStatus() {
        return this.statusService.getAllStatus(); 
    }
}
