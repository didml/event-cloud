import { EventEntity } from './entities/event.entity';

export function toEventResponse(event: EventEntity) {
  const participants = event.participants ?? [];
  const treeBranches = event.treeBranches ?? [];

  return {
    id: event.id,
    name: event.name,
    startAt: event.startAt.toISOString(),
    location: event.location,
    city: event.city ?? null,
    address: event.address ?? null,
    description: event.description,
    publicLink: event.publicLink,
    slug: event.slug,
    status: event.status,
    visibility: event.visibility,
    format: event.format,
    participants: participants.length,
    treeItems: treeBranches.reduce((sum, branch) => sum + (branch.items?.length || 0), 0),
    dayPlan: (event.dayPlan ?? []).map((item) => ({
      id: item.id,
      time: item.time,
      label: item.label,
      owner: item.owner,
    })),
    team: participants.map((participant) => ({
      id: participant.id,
      name: participant.name,
      role: participant.role,
      state: participant.state,
      email: participant.email,
    })),
    tree: treeBranches.map((branch) => ({
      id: branch.id,
      title: branch.title,
      state: branch.state,
      items: (branch.items ?? []).map((item) => item.value),
    })),
  };
}
