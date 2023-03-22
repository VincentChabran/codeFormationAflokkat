import { SetMetadata } from '@nestjs/common';

export const IGNORE_JWT_GUARD_KEY = 'ignoreJwtGuard';
export const IgnoreJwtGuard = () => SetMetadata(IGNORE_JWT_GUARD_KEY, true);
