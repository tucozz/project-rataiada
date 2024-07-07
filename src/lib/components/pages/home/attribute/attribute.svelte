<script>
    let counter = 0;
</script>

<div>
    <button on:click={() => counter--} /> -
    <p /> {counter}
    <button on:click={() => counter++} /> +
</div>

<style>
    
</style>
