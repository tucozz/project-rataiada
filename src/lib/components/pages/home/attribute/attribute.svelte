<script>
    let counter = 0;
</script>

<style>
    #main {
        display: flex;
        justify-content: space-between;
    }
    #firstq {
        font-size: 3em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    #secondq {
        font-size: 1.5em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>

<div id="main">
    <!-- The main div containing the other two -->
    <!-- The two divs should be side by side -->
     <div id="firstq">
        <!-- Div containing an imput for name and for background -->
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" />
        </div>
        <div>
            <!-- Div containing an imput for background -->
            <!-- Background should be a dropdown with multiple options-->
            <label for="background">Background:</label>
            <select id="background" name="background">
                <!--TODO: USE THIS WITH THE SIMPLE ENUM -->
                <option value="TestSubject">Test Subject</option>
                <option value="KitchenForager">Kitchen Forager</option>
                <option value="CageDweller">Cage Dweller</option>
                <option value="HedgeWitch">Hedge Witch</option>
                <option value="Leatherworker">Leatherworker</option>
                <option value="StreetTough">Street Tough</option>
                <option value="MendicantPriest">Mendicant Priest</option>
                <option value="Beetleherd">Beetleherd</option>
                <option value="AleBrewer">Ale Brewer</option>
                <option value="Fishermouse">Fishermouse</option>
                <option value="Blacksmith">Blacksmith</option>
                <option value="Wireworker">Wireworker</option>
                <option value="Woodcutter">Woodcutter</option>
                <option value="BatCultist">Bat Cultist</option>
                <option value="TinMiner">Tin Miner</option>
                <option value="TrashCollector">Trash Collector</option>
                <option value="WallRover">Wall Rover</option>
                <option value="Merchant">Merchant</option>
                <option value="RaftCrew">Raft Crew</option>
                <option value="WormWrangler">Worm Wrangler</option>
                <option value="SparrowRider">Sparrow Rider</option>
                <option value="SewerGuide">Sewer Guide</option>
                <option value="PrisonGuard">Prison Guard</option>
                <option value="FungusFarmer">Fungus Farmer</option>
                <option value="DamBuilder">Dam Builder</option>
                <option value="Cartographer">Cartographer</option>
                <option value="TrapThief">Trap Thief</option>
                <option value="Vagabond">Vagabond</option>
                <option value="GrainFarmer">Grain Farmer</option>
                <option value="MessageRunner">Message Runner</option>
                <option value="Troubadour">Troubadour</option>
                <option value="Gambler">Gambler</option>
                <option value="SapTapper">Sap Tapper</option>
                <option value="BeeKeeper">Bee Keeper</option>
                <option value="Librarian">Librarian</option>
                <option value="PauperNoblemouse">Pauper Noblemouse</option>
            </select>
        </div>
     </div>
     <div id="secondq">
        <!-- Div containing an imput for birthsign, coat and look-->
        <div>
            <label for="birthsign">Birthsign:</label>
            <select id="birthsign" name="birthsign">
                <option value="Star">Star</option>
                <option value="Wheel">Wheel</option>
                <option value="Acorn">Acorn</option>
                <option value="Storm">Storm</option>
                <option value="Moon">Moon</option>
                <option value="Mother">Mother</option>
            </select>
        </div>
        <div>
            <label for="coat">Coat:</label>
            <select id="coatcolor" name="coat color">
                <option value="Chocolate">Chocolate</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Tan">Tan</option>
                <option value="Grey">Grey</option>
                <option value="Blue">Blue</option>
            </select>
            <select id="coatpattern" name="coat pattern">
                <option value="Solid">Solid</option>
                <option value="Brindle">Brindle</option>
                <option value="Patchy">Patchy</option>
                <option value="Banded">Banded</option>
                <option value="Marbled">Marbled</option>
                <option value="Flecked">Flecked</option>
            </select>
        </div>
        <div>
            <label for="look">Look:</label>
            <select id="look" name="look">
                <option value="SkarredBody">Skarred Body</option>
                <option value="CorpulentBody">Corpulent Body</option>
                <option value="TinyBody">Tiny Body</option>
                <option value="WillowyBody">Willowy Body</option>
                <option value="PaintedFace">Painted Face</option>
                <option value="MassiveClothes">Massive Clothes</option>
                <option value="ForeignClothes">Foreign Clothes</option>
                <option value="ElegantClothes">Elegant Clothes</option>
                <option value="PatchedClothes">Patched Clothes</option>
                <option value="UnwashedClothes">Unwashed Clothes</option>
                <option value="GroomedFur">Groomed Fur</option>
                <option value="DyedFur">Dyed Fur</option>
                <option value="Dreadlocks">Dreadlocks</option>
                <option value="ShavedFur">Shaved Fur</option>
                <option value="FrizzyFur">Frizzy Fur</option>
                <option value="SilkyFur">Silky Fur</option>
                <option value="NightEyePatch">Night Eye Patch</option>
                <option value="BloodRedEyes">Blood Red Eyes</option>
                <option value="LuminousEyes">Luminous Eyes</option>
                <option value="WhippedTail">Whipped Tail</option>
                <option value="CrookedTail">Crooked Tail</option>
                <option value="SharpEyes">Sharp Eyes</option>
                <option value="WiseEyes">Wise Eyes</option>
                <option value="GroomedFur">Groomed Fur</option>
                <option value="Dreadlocks">Dreadlocks</option>
                <option value="DyedFur">Dyed Fur</option>
                <option value="ShavedFur">Shaved Fur</option>
                <option value="FrizzyFur">Frizzy Fur</option>
                <option value="SilkyFur">Silky Fur</option>
                <option value="NightEyePatch">Night Eye Patch</option>
                <option value="EyePatch">Eye Patch</option>
                <option value="BloodRedEyes">Blood Red Eyes</option>
                <option value="WiseEyes">Wise Eyes</option>
                <option value="SharpEyes">Sharp Eyes</option>
                <option value="LuminousEyes">Luminous Eyes</option>
                <option value="CrookedTail">Crooked Tail</option>
                <option value="WhippedTail">Whipped Tail</option>
                <option value="TuftedTail">Tufted Tail</option>
                <option value="StubbyTail">Stubby Tail</option>
                <option value="PrehensileTail">Prehensile Tail</option>
                <option value="CurlyTail">Curly Tail</option>
            </select>
        </div>
     </div>
</div>
