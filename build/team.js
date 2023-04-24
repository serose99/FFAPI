"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const record_1 = require("./record");
class Team {
    constructor(team) {
        this.abbrev = team.abbrev;
        this.currentProjectedRank = team.currentProjectedRank;
        this.divisionId = team.divisionId;
        this.draftDayProjectedRank = team.draftDayProjectedRank;
        this.id = team.id;
        this.name = team.name;
        this.owners = team.owners;
        this.playoffSeed = team.playoffSeed;
        this.points = team.points;
        this.primaryOwner = team.primaryOwner;
        this.rankCalculatedFinal = team.rankCalculatedFinal;
        this.record = new record_1.TeamRecord(team.record);
        //this.roster = new Roster(team.roster);
        this.transactionCounter = team.transactionCounter;
        this.waiverRank = team.waiverRank;
    }
}
exports.Team = Team;