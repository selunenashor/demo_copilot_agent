<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Foreign key to users table
            $table->string('title');
            $table->text('description')->nullable();
            $table->timestamp('appointment_time');
            $table->timestamps();

            // Indexes (Laravel creates indexes for foreign keys automatically)
            // $table->index('user_id'); // Optional: Already created by constrained()
            $table->index('appointment_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
