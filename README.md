This is an AI-driven research assistant project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

  

## Download Project Files
1. Clone project repo.
```bash
git clone https://github.com/schandillia/poco.git
```
2. Manually copy `.env` into the new machine.

## Setup Node Environment

 1. Install NVM.
```bash
curl  -o-  https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```
```bash
.  ~/.nvm/nvm.sh
```
 2. Use NVM to install NodeJS (this will also install npm and npx).
```bash
nvm install --lts
```
3. Install pnpm.
```bash
npm install -g pnpm
```

## Update Prisma
1. Apply local schema to remote database.
```bash
npx prisma db push
```
2. Generate Prisma Client.
```bash
npx prisma generate
```

## Set Up Hot Reload
1. Compile project in `dev` mode.
```bash
pnpm dev
```
2. If ready, compile project in `prod` mode and launch.
```bash
pnpm build
```
```bash
pnpm start
```