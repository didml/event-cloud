import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthUser } from '../common/types/auth-user.type';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createEventSchema, inviteParticipantSchema, joinPublicEventSchema, updateEventSchema } from './events.schemas';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my')
  listMy(@CurrentUser() user: AuthUser) {
    return this.eventsService.listMyEvents(user.sub);
  }

  @Get('discover')
  discover(
    @Query('query') query?: string,
    @Query('format') format?: string,
    @Query('visibility') visibility?: string,
  ) {
    return this.eventsService.listDiscover({ query, format, visibility });
  }

  @Get('locations')
  locations(@Query('query') query?: string) {
    return this.eventsService.locationSuggestions(query ?? '');
  }

  @Get('public/:slug')
  getPublic(@Param('slug') slug: string) {
    return this.eventsService.publicEventBySlug(slug);
  }

  @Post('public/:slug/request-access')
  @UsePipes(new ZodValidationPipe(joinPublicEventSchema))
  joinPublic(@Param('slug') slug: string, @Body() body: unknown) {
    return this.eventsService.joinPublicEvent(slug, body as any);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.eventsService.getById(user.sub, Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ZodValidationPipe(createEventSchema))
  create(@CurrentUser() user: AuthUser, @Body() body: unknown) {
    return this.eventsService.create(user.sub, body as any);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateEventSchema))
  update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() body: unknown) {
    return this.eventsService.update(user.sub, Number(id), body as any);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.eventsService.remove(user.sub, Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/invite')
  @UsePipes(new ZodValidationPipe(inviteParticipantSchema))
  invite(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() body: unknown) {
    return this.eventsService.inviteParticipant(user.sub, Number(id), body as any);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/participants/:participantId/confirm')
  confirm(@CurrentUser() user: AuthUser, @Param('id') id: string, @Param('participantId') participantId: string) {
    return this.eventsService.setParticipantState(user.sub, Number(id), Number(participantId), 'confirmed');
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/participants/:participantId/pending')
  pending(@CurrentUser() user: AuthUser, @Param('id') id: string, @Param('participantId') participantId: string) {
    return this.eventsService.setParticipantState(user.sub, Number(id), Number(participantId), 'pending');
  }
}
