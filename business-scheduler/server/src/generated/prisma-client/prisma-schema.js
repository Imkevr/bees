module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateAppointment {
  count: Int!
}

type AggregatecalendarSettings {
  count: Int!
}

type AggregateClient {
  count: Int!
}

type AggregateService {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Appointment {
  id: ID!
  start: DateTime!
  end: DateTime!
  completed: Boolean
  service: Service!
  user: User!
  client: Client!
}

type AppointmentConnection {
  pageInfo: PageInfo!
  edges: [AppointmentEdge]!
  aggregate: AggregateAppointment!
}

input AppointmentCreateInput {
  id: ID
  start: DateTime!
  end: DateTime!
  completed: Boolean
  service: ServiceCreateOneInput!
  user: UserCreateOneInput!
  client: ClientCreateOneInput!
}

type AppointmentEdge {
  node: Appointment!
  cursor: String!
}

enum AppointmentOrderByInput {
  id_ASC
  id_DESC
  start_ASC
  start_DESC
  end_ASC
  end_DESC
  completed_ASC
  completed_DESC
}

type AppointmentPreviousValues {
  id: ID!
  start: DateTime!
  end: DateTime!
  completed: Boolean
}

type AppointmentSubscriptionPayload {
  mutation: MutationType!
  node: Appointment
  updatedFields: [String!]
  previousValues: AppointmentPreviousValues
}

input AppointmentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AppointmentWhereInput
  AND: [AppointmentSubscriptionWhereInput!]
  OR: [AppointmentSubscriptionWhereInput!]
  NOT: [AppointmentSubscriptionWhereInput!]
}

input AppointmentUpdateInput {
  start: DateTime
  end: DateTime
  completed: Boolean
  service: ServiceUpdateOneRequiredInput
  user: UserUpdateOneRequiredInput
  client: ClientUpdateOneRequiredInput
}

input AppointmentUpdateManyMutationInput {
  start: DateTime
  end: DateTime
  completed: Boolean
}

input AppointmentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  start: DateTime
  start_not: DateTime
  start_in: [DateTime!]
  start_not_in: [DateTime!]
  start_lt: DateTime
  start_lte: DateTime
  start_gt: DateTime
  start_gte: DateTime
  end: DateTime
  end_not: DateTime
  end_in: [DateTime!]
  end_not_in: [DateTime!]
  end_lt: DateTime
  end_lte: DateTime
  end_gt: DateTime
  end_gte: DateTime
  completed: Boolean
  completed_not: Boolean
  service: ServiceWhereInput
  user: UserWhereInput
  client: ClientWhereInput
  AND: [AppointmentWhereInput!]
  OR: [AppointmentWhereInput!]
  NOT: [AppointmentWhereInput!]
}

input AppointmentWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

type calendarSettings {
  id: ID!
  workStart: Int!
  workEnd: Int!
  forUser: User!
}

type calendarSettingsConnection {
  pageInfo: PageInfo!
  edges: [calendarSettingsEdge]!
  aggregate: AggregatecalendarSettings!
}

input calendarSettingsCreateInput {
  id: ID
  workStart: Int!
  workEnd: Int!
  forUser: UserCreateOneInput!
}

type calendarSettingsEdge {
  node: calendarSettings!
  cursor: String!
}

enum calendarSettingsOrderByInput {
  id_ASC
  id_DESC
  workStart_ASC
  workStart_DESC
  workEnd_ASC
  workEnd_DESC
}

type calendarSettingsPreviousValues {
  id: ID!
  workStart: Int!
  workEnd: Int!
}

type calendarSettingsSubscriptionPayload {
  mutation: MutationType!
  node: calendarSettings
  updatedFields: [String!]
  previousValues: calendarSettingsPreviousValues
}

input calendarSettingsSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: calendarSettingsWhereInput
  AND: [calendarSettingsSubscriptionWhereInput!]
  OR: [calendarSettingsSubscriptionWhereInput!]
  NOT: [calendarSettingsSubscriptionWhereInput!]
}

input calendarSettingsUpdateInput {
  workStart: Int
  workEnd: Int
  forUser: UserUpdateOneRequiredInput
}

input calendarSettingsUpdateManyMutationInput {
  workStart: Int
  workEnd: Int
}

input calendarSettingsWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  workStart: Int
  workStart_not: Int
  workStart_in: [Int!]
  workStart_not_in: [Int!]
  workStart_lt: Int
  workStart_lte: Int
  workStart_gt: Int
  workStart_gte: Int
  workEnd: Int
  workEnd_not: Int
  workEnd_in: [Int!]
  workEnd_not_in: [Int!]
  workEnd_lt: Int
  workEnd_lte: Int
  workEnd_gt: Int
  workEnd_gte: Int
  forUser: UserWhereInput
  AND: [calendarSettingsWhereInput!]
  OR: [calendarSettingsWhereInput!]
  NOT: [calendarSettingsWhereInput!]
}

input calendarSettingsWhereUniqueInput {
  id: ID
}

type Client {
  id: ID!
  firstname: String!
  lastname: String!
  user: User!
}

type ClientConnection {
  pageInfo: PageInfo!
  edges: [ClientEdge]!
  aggregate: AggregateClient!
}

input ClientCreateInput {
  id: ID
  firstname: String!
  lastname: String!
  user: UserCreateOneInput!
}

input ClientCreateOneInput {
  create: ClientCreateInput
  connect: ClientWhereUniqueInput
}

type ClientEdge {
  node: Client!
  cursor: String!
}

enum ClientOrderByInput {
  id_ASC
  id_DESC
  firstname_ASC
  firstname_DESC
  lastname_ASC
  lastname_DESC
}

type ClientPreviousValues {
  id: ID!
  firstname: String!
  lastname: String!
}

type ClientSubscriptionPayload {
  mutation: MutationType!
  node: Client
  updatedFields: [String!]
  previousValues: ClientPreviousValues
}

input ClientSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ClientWhereInput
  AND: [ClientSubscriptionWhereInput!]
  OR: [ClientSubscriptionWhereInput!]
  NOT: [ClientSubscriptionWhereInput!]
}

input ClientUpdateDataInput {
  firstname: String
  lastname: String
  user: UserUpdateOneRequiredInput
}

input ClientUpdateInput {
  firstname: String
  lastname: String
  user: UserUpdateOneRequiredInput
}

input ClientUpdateManyMutationInput {
  firstname: String
  lastname: String
}

input ClientUpdateOneRequiredInput {
  create: ClientCreateInput
  update: ClientUpdateDataInput
  upsert: ClientUpsertNestedInput
  connect: ClientWhereUniqueInput
}

input ClientUpsertNestedInput {
  update: ClientUpdateDataInput!
  create: ClientCreateInput!
}

input ClientWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstname: String
  firstname_not: String
  firstname_in: [String!]
  firstname_not_in: [String!]
  firstname_lt: String
  firstname_lte: String
  firstname_gt: String
  firstname_gte: String
  firstname_contains: String
  firstname_not_contains: String
  firstname_starts_with: String
  firstname_not_starts_with: String
  firstname_ends_with: String
  firstname_not_ends_with: String
  lastname: String
  lastname_not: String
  lastname_in: [String!]
  lastname_not_in: [String!]
  lastname_lt: String
  lastname_lte: String
  lastname_gt: String
  lastname_gte: String
  lastname_contains: String
  lastname_not_contains: String
  lastname_starts_with: String
  lastname_not_starts_with: String
  lastname_ends_with: String
  lastname_not_ends_with: String
  user: UserWhereInput
  AND: [ClientWhereInput!]
  OR: [ClientWhereInput!]
  NOT: [ClientWhereInput!]
}

input ClientWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createAppointment(data: AppointmentCreateInput!): Appointment!
  updateAppointment(data: AppointmentUpdateInput!, where: AppointmentWhereUniqueInput!): Appointment
  updateManyAppointments(data: AppointmentUpdateManyMutationInput!, where: AppointmentWhereInput): BatchPayload!
  upsertAppointment(where: AppointmentWhereUniqueInput!, create: AppointmentCreateInput!, update: AppointmentUpdateInput!): Appointment!
  deleteAppointment(where: AppointmentWhereUniqueInput!): Appointment
  deleteManyAppointments(where: AppointmentWhereInput): BatchPayload!
  createClient(data: ClientCreateInput!): Client!
  updateClient(data: ClientUpdateInput!, where: ClientWhereUniqueInput!): Client
  updateManyClients(data: ClientUpdateManyMutationInput!, where: ClientWhereInput): BatchPayload!
  upsertClient(where: ClientWhereUniqueInput!, create: ClientCreateInput!, update: ClientUpdateInput!): Client!
  deleteClient(where: ClientWhereUniqueInput!): Client
  deleteManyClients(where: ClientWhereInput): BatchPayload!
  createService(data: ServiceCreateInput!): Service!
  updateService(data: ServiceUpdateInput!, where: ServiceWhereUniqueInput!): Service
  updateManyServices(data: ServiceUpdateManyMutationInput!, where: ServiceWhereInput): BatchPayload!
  upsertService(where: ServiceWhereUniqueInput!, create: ServiceCreateInput!, update: ServiceUpdateInput!): Service!
  deleteService(where: ServiceWhereUniqueInput!): Service
  deleteManyServices(where: ServiceWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createcalendarSettings(data: calendarSettingsCreateInput!): calendarSettings!
  updatecalendarSettings(data: calendarSettingsUpdateInput!, where: calendarSettingsWhereUniqueInput!): calendarSettings
  updateManycalendarSettingses(data: calendarSettingsUpdateManyMutationInput!, where: calendarSettingsWhereInput): BatchPayload!
  upsertcalendarSettings(where: calendarSettingsWhereUniqueInput!, create: calendarSettingsCreateInput!, update: calendarSettingsUpdateInput!): calendarSettings!
  deletecalendarSettings(where: calendarSettingsWhereUniqueInput!): calendarSettings
  deleteManycalendarSettingses(where: calendarSettingsWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  appointment(where: AppointmentWhereUniqueInput!): Appointment
  appointments(where: AppointmentWhereInput, orderBy: AppointmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Appointment]!
  appointmentsConnection(where: AppointmentWhereInput, orderBy: AppointmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AppointmentConnection!
  client(where: ClientWhereUniqueInput!): Client
  clients(where: ClientWhereInput, orderBy: ClientOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Client]!
  clientsConnection(where: ClientWhereInput, orderBy: ClientOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ClientConnection!
  service(where: ServiceWhereUniqueInput!): Service
  services(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Service]!
  servicesConnection(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ServiceConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  calendarSettings(where: calendarSettingsWhereUniqueInput!): calendarSettings
  calendarSettingses(where: calendarSettingsWhereInput, orderBy: calendarSettingsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [calendarSettings]!
  calendarSettingsesConnection(where: calendarSettingsWhereInput, orderBy: calendarSettingsOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): calendarSettingsConnection!
  node(id: ID!): Node
}

type Service {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  cost: Float!
  description: String!
  hours: Int!
  minutes: Int!
  postedBy: User
}

type ServiceConnection {
  pageInfo: PageInfo!
  edges: [ServiceEdge]!
  aggregate: AggregateService!
}

input ServiceCreateInput {
  id: ID
  name: String!
  cost: Float!
  description: String!
  hours: Int!
  minutes: Int!
  postedBy: UserCreateOneWithoutServicesInput
}

input ServiceCreateManyWithoutPostedByInput {
  create: [ServiceCreateWithoutPostedByInput!]
  connect: [ServiceWhereUniqueInput!]
}

input ServiceCreateOneInput {
  create: ServiceCreateInput
  connect: ServiceWhereUniqueInput
}

input ServiceCreateWithoutPostedByInput {
  id: ID
  name: String!
  cost: Float!
  description: String!
  hours: Int!
  minutes: Int!
}

type ServiceEdge {
  node: Service!
  cursor: String!
}

enum ServiceOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  cost_ASC
  cost_DESC
  description_ASC
  description_DESC
  hours_ASC
  hours_DESC
  minutes_ASC
  minutes_DESC
}

type ServicePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  cost: Float!
  description: String!
  hours: Int!
  minutes: Int!
}

input ServiceScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  cost: Float
  cost_not: Float
  cost_in: [Float!]
  cost_not_in: [Float!]
  cost_lt: Float
  cost_lte: Float
  cost_gt: Float
  cost_gte: Float
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  hours: Int
  hours_not: Int
  hours_in: [Int!]
  hours_not_in: [Int!]
  hours_lt: Int
  hours_lte: Int
  hours_gt: Int
  hours_gte: Int
  minutes: Int
  minutes_not: Int
  minutes_in: [Int!]
  minutes_not_in: [Int!]
  minutes_lt: Int
  minutes_lte: Int
  minutes_gt: Int
  minutes_gte: Int
  AND: [ServiceScalarWhereInput!]
  OR: [ServiceScalarWhereInput!]
  NOT: [ServiceScalarWhereInput!]
}

type ServiceSubscriptionPayload {
  mutation: MutationType!
  node: Service
  updatedFields: [String!]
  previousValues: ServicePreviousValues
}

input ServiceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ServiceWhereInput
  AND: [ServiceSubscriptionWhereInput!]
  OR: [ServiceSubscriptionWhereInput!]
  NOT: [ServiceSubscriptionWhereInput!]
}

input ServiceUpdateDataInput {
  name: String
  cost: Float
  description: String
  hours: Int
  minutes: Int
  postedBy: UserUpdateOneWithoutServicesInput
}

input ServiceUpdateInput {
  name: String
  cost: Float
  description: String
  hours: Int
  minutes: Int
  postedBy: UserUpdateOneWithoutServicesInput
}

input ServiceUpdateManyDataInput {
  name: String
  cost: Float
  description: String
  hours: Int
  minutes: Int
}

input ServiceUpdateManyMutationInput {
  name: String
  cost: Float
  description: String
  hours: Int
  minutes: Int
}

input ServiceUpdateManyWithoutPostedByInput {
  create: [ServiceCreateWithoutPostedByInput!]
  delete: [ServiceWhereUniqueInput!]
  connect: [ServiceWhereUniqueInput!]
  set: [ServiceWhereUniqueInput!]
  disconnect: [ServiceWhereUniqueInput!]
  update: [ServiceUpdateWithWhereUniqueWithoutPostedByInput!]
  upsert: [ServiceUpsertWithWhereUniqueWithoutPostedByInput!]
  deleteMany: [ServiceScalarWhereInput!]
  updateMany: [ServiceUpdateManyWithWhereNestedInput!]
}

input ServiceUpdateManyWithWhereNestedInput {
  where: ServiceScalarWhereInput!
  data: ServiceUpdateManyDataInput!
}

input ServiceUpdateOneRequiredInput {
  create: ServiceCreateInput
  update: ServiceUpdateDataInput
  upsert: ServiceUpsertNestedInput
  connect: ServiceWhereUniqueInput
}

input ServiceUpdateWithoutPostedByDataInput {
  name: String
  cost: Float
  description: String
  hours: Int
  minutes: Int
}

input ServiceUpdateWithWhereUniqueWithoutPostedByInput {
  where: ServiceWhereUniqueInput!
  data: ServiceUpdateWithoutPostedByDataInput!
}

input ServiceUpsertNestedInput {
  update: ServiceUpdateDataInput!
  create: ServiceCreateInput!
}

input ServiceUpsertWithWhereUniqueWithoutPostedByInput {
  where: ServiceWhereUniqueInput!
  update: ServiceUpdateWithoutPostedByDataInput!
  create: ServiceCreateWithoutPostedByInput!
}

input ServiceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  cost: Float
  cost_not: Float
  cost_in: [Float!]
  cost_not_in: [Float!]
  cost_lt: Float
  cost_lte: Float
  cost_gt: Float
  cost_gte: Float
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  hours: Int
  hours_not: Int
  hours_in: [Int!]
  hours_not_in: [Int!]
  hours_lt: Int
  hours_lte: Int
  hours_gt: Int
  hours_gte: Int
  minutes: Int
  minutes_not: Int
  minutes_in: [Int!]
  minutes_not_in: [Int!]
  minutes_lt: Int
  minutes_lte: Int
  minutes_gt: Int
  minutes_gte: Int
  postedBy: UserWhereInput
  AND: [ServiceWhereInput!]
  OR: [ServiceWhereInput!]
  NOT: [ServiceWhereInput!]
}

input ServiceWhereUniqueInput {
  id: ID
}

type Subscription {
  appointment(where: AppointmentSubscriptionWhereInput): AppointmentSubscriptionPayload
  client(where: ClientSubscriptionWhereInput): ClientSubscriptionPayload
  service(where: ServiceSubscriptionWhereInput): ServiceSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  calendarSettings(where: calendarSettingsSubscriptionWhereInput): calendarSettingsSubscriptionPayload
}

type User {
  id: ID!
  firstname: String!
  lastname: String!
  email: String!
  password: String!
  services(where: ServiceWhereInput, orderBy: ServiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Service!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  firstname: String!
  lastname: String!
  email: String!
  password: String!
  services: ServiceCreateManyWithoutPostedByInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutServicesInput {
  create: UserCreateWithoutServicesInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutServicesInput {
  id: ID
  firstname: String!
  lastname: String!
  email: String!
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  firstname_ASC
  firstname_DESC
  lastname_ASC
  lastname_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
}

type UserPreviousValues {
  id: ID!
  firstname: String!
  lastname: String!
  email: String!
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  firstname: String
  lastname: String
  email: String
  password: String
  services: ServiceUpdateManyWithoutPostedByInput
}

input UserUpdateInput {
  firstname: String
  lastname: String
  email: String
  password: String
  services: ServiceUpdateManyWithoutPostedByInput
}

input UserUpdateManyMutationInput {
  firstname: String
  lastname: String
  email: String
  password: String
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutServicesInput {
  create: UserCreateWithoutServicesInput
  update: UserUpdateWithoutServicesDataInput
  upsert: UserUpsertWithoutServicesInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutServicesDataInput {
  firstname: String
  lastname: String
  email: String
  password: String
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutServicesInput {
  update: UserUpdateWithoutServicesDataInput!
  create: UserCreateWithoutServicesInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstname: String
  firstname_not: String
  firstname_in: [String!]
  firstname_not_in: [String!]
  firstname_lt: String
  firstname_lte: String
  firstname_gt: String
  firstname_gte: String
  firstname_contains: String
  firstname_not_contains: String
  firstname_starts_with: String
  firstname_not_starts_with: String
  firstname_ends_with: String
  firstname_not_ends_with: String
  lastname: String
  lastname_not: String
  lastname_in: [String!]
  lastname_not_in: [String!]
  lastname_lt: String
  lastname_lte: String
  lastname_gt: String
  lastname_gte: String
  lastname_contains: String
  lastname_not_contains: String
  lastname_starts_with: String
  lastname_not_starts_with: String
  lastname_ends_with: String
  lastname_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  services_every: ServiceWhereInput
  services_some: ServiceWhereInput
  services_none: ServiceWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    