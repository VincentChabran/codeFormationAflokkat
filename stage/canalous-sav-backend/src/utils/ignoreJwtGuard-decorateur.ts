import { SetMetadata } from "@nestjs/common";

// Crée un décorateur @IgnoreJwtGuard()
// pour ignorer le jwt guard sur certaines routes
export const IGNORE_JWTGUARD_KEY = "isIgnoreJwtGuard";
export const IgnoreJwtGuard = () => SetMetadata(IGNORE_JWTGUARD_KEY, true);
