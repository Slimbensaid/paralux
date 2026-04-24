import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { DiagnosticService } from './diagnostic.service';

@Controller('diagnostic')
export class DiagnosticController {
  constructor(private diagnosticService: DiagnosticService) {}

  @Post('analyze')
  async analyze(@Request() req, @Body() answers: any) {
    // Assuming req.user is populated by a JWT Guard (to be added in final polish)
    const userId = req.user?.id || 'guest-id'; 
    return this.diagnosticService.processDiagnostic(userId, answers);
  }

  @Get('history/:userId')
  async getHistory(@Param('userId') userId: string) {
    return this.diagnosticService.findByUserId(userId);
  }
}
