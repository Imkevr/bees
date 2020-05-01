async function signup(parent, args, context, info){
    const hashedPassword = await bcrypt.hash(args.password, 10)
    const {password, ...user} = await context.prisma.createUser({...args, password: hashedPassword})
}