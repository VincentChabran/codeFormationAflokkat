"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnoreJwtGuard = exports.IGNORE_JWTGUARD_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IGNORE_JWTGUARD_KEY = "isIgnoreJwtGuard";
const IgnoreJwtGuard = () => (0, common_1.SetMetadata)(exports.IGNORE_JWTGUARD_KEY, true);
exports.IgnoreJwtGuard = IgnoreJwtGuard;
//# sourceMappingURL=ignoreJwtGuard-decorateur.js.map